import { Controller } from "stimulus";
import { getHostname } from "../utils/urlHelper.js"; 
import BlockList from "../utils/blockList.js";
import * as BlockListItemElement from "../fragments/BlockList/Item.js";

export default class extends Controller {
	static targets = ["listElement"];

	async connect() {
		this.blockList = new BlockList();
		this.list = [];
		let listResult = await this.blockList.list();

		if(listResult.error){
			console.error(listResult.error);
			return;
		}
		
		this.list = listResult.value;

		console.log(this.list);
		this.createListElements();
	}

	createListElements(){
		for (var i = this.list.length - 1; i >= 0; i--) {
			let url = this.list[i];

			this.addBlockListItem(url)
		}
	}

    addBlockListItem(url, options = {}) {
        let blockListItem = BlockListItemElement.create(url);
      	
      	// Warning: Using `undefined`
      	// Reasons:
      	// 1. Object.hasOwnProperty was not working correctly
      	// 2. "in" operator is unsuitable.
      	let indexExists = options["index"] !== undefined;
      	console.log("index exists:", indexExists);

  		if (indexExists) {
	        let existingElementAtPosition = this.listElementTarget.children[options.index];
        	existingElementAtPosition.insertAdjacentElement('beforebegin', blockListItem)
  		}
      	 else {
			this.listElementTarget.appendChild(blockListItem);
        }
    }
    

	async add() {
		let url = window.prompt("Enter a url to block:");

		try{
			let hostNameToAdd = getHostname(url);
			
			if(!hostNameToAdd){
				window.alert("You didn't enter a valid URL");
				return;
			}
			
			let addResult = await this.blockList.add(url);

			if (addResult.error){
				console.error(addResult.error);
				return;
			}

			console.log("Add Result:", addResult);

			let options =  {
				index: addResult.index
			}

			this.addBlockListItem(hostNameToAdd, options);
				
		}
		catch (err) {
			window.alert(err);
		}
	}
}