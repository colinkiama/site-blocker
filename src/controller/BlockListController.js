import { Controller } from "stimulus";
import { getHostname } from "../utils/urlHelper.js"; 
import BlockList from "../utils/blockList.js";

export default class extends Controller {
	static targets = ["listElement"];

	async connect() {
		console.log("retreiving all blocklist items");
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

			this.addBlockListItem(url);
		}
	}

    addBlockListItem(url) {
        let urlSpan = document.createElement("span");
        urlSpan.textContent = url;

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("primary");
        removeButton.setAttribute("data-action", "block-list-item#delete");

        let blockListItem = document.createElement('li');
        blockListItem.classList.add("block-list-item");
        blockListItem.setAttribute("data-controller", "block-list-item");
        blockListItem.setAttribute("data-block-list-item-url-value", url);

        blockListItem.appendChild(urlSpan);
        blockListItem.appendChild(removeButton);

        this.listElementTarget.appendChild(blockListItem);
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

			console.log("Add result value:", addResult.value);			
			this.addBlockListItem(hostNameToAdd);
				
		}
		catch (err) {
			window.alert(err);
		}
	}
}