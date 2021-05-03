import * as Storage from "./storage.js";

const blockListStorageKey = "blockList";

export default class {
	constructor(){
		this._listCache = [];
	}

	async add(url){
		await this._fillCacheIfEmpty();

		let result = {};

		if (this._listCache.indexOf(url) > -1) {
			// URL is already in list
			return result;
		}
		
		this._listCache = [...this._listCache, url ];

		try {
			await this._saveList();
			result.value = this._listCache;
		}
		catch (err) {
			// Undo last add.
			const itemIndex = this._listCache.indexOf(url);
			this._listCache.splice(itemIndex, 1);
			result.error = err;
		}

		console.log("List Cache:", this._listCache);
		return result;
} 
	
	async remove(url) {
		this._fillCacheIfEmpty();
		let result = {};
		
		let itemIndex = this._listCache.indexOf(url);
		
		// URL isn't in list
		if (itemIndex === -1) {
			result.error = new Error("URL isn't in list");
			return result;
		}

		this._listCache.splice(itemIndex, 1);

		try {
			await this._saveList();
		}
		catch (err) {
			// Undo item deletion
			this._listCache.splice(itemIndex, 0, url);
			result.error = err;
		}

		return result;

	}

	async contains(url){
		await this._fillCacheIfEmpty();

		// An index of -1 means that the url isn't
		// present in the block list at all.
		return this._listCache.indexOf(url) > -1;
	}


	async list() {
		let result = await this._fillCacheIfEmpty();
		
		if(!result.err){
			result.value = this._listCache;
		}

		return result;
	}

	async _fillCacheIfEmpty() {
		let result = {};
		if (this._listCache.length === 0) {
			try {
				let returnedObject = await this._loadList();
				
				// Check if value exists for key
				if(returnedObject[blockListStorageKey]){
					this._listCache = returnedObject[blockListStorageKey];
				}
			}
			catch(err) {
				result.error = err;
			}
		}

		return result;
	}

	async _saveList() {
		// There will be a callback to handle 
		await Storage.save(blockListStorageKey, this._listCache);
	}

	async _loadList() {
		return await Storage.load(blockListStorageKey);
	}





}