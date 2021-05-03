const blockListStorageKey = "blockList";
export default class {
	constructor(){
		this._listCache = [];
	}

	add(url){
		this._fillCacheIfEmpty();
	}
	
	remove(url) {
		this._fillCacheIfEmpty();
	}

	contains(url){
		this._fillCacheIfEmpty();
		return this._listCache.contains()
	}


	list() {
		this._fillCacheIfEmpty();
		return this._listCache;
	}

	_fillCacheIfEmpty() {
		if(this._listCache.length === 0) {
			this._listCache = this._loadList();
		}
	}

	_saveList() {
		// There will be a callback to handle 
		//return Storage.save(blockListStorageKey, this._listCache);
		console.log("saved");
	}

	_loadList() {
		// There will be a callback to handle
		// this._listCache = Storage.load(blockListStorageKey);
		return ["www.facebook.com", "web.whatsapp.com"]
	}





}