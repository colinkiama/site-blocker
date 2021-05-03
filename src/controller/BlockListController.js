import { Controller } from "stimulus";
import { getHostname } from "../utils/urlHelper.js"; 
import BlockList from "../utils/blockList.js";

export default class extends Controller {
	static targets = ["listElement"];

	connect() {
		console.log("retreiving all blocklist items");
		this.blockList = new BlockList();
		this.list = this.blockList.list();
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

	add() {
		let url = window.prompt("Enter a url to block:");

		try{
			let hostNameToAdd = getHostname(url);
			
			if(!hostNameToAdd){
				window.alert("You didn't enter a valid URL");
				return;
			}
			
			this.blockList.add(url);
			// If blocklist callback returns a succesful result
			// Add the new item to the DOM
			this.addBlockListItem(hostNameToAdd);
		}
		catch (err) {
			window.alert(err);
		}
	}
}