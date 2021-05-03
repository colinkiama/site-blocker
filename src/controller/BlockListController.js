import { Controller } from "stimulus";
import { getHostname } from "../utils/URLHelper.js"; 

export default class extends Controller {
	static targets = ["listElement"];

	connect() {
		console.log("retreiving all blocklist items");

		this.blockList = ["www.tiktok.com", "www.facebook.com"];

		this.createListElements();
	}

	createListElements(){
		for (var i = this.blockList.length - 1; i >= 0; i--) {
			let url = this.blockList[i];
			
			this.addBlockListItem(url);
		}
	}

    addBlockListItem(url) {
        let urlSpan = document.createElement("span");
        urlSpan.textContent = url;

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("primary");

        let blockListItem = document.createElement('li');
        blockListItem.classList.add("block-list-item");

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
			
			// If blocklist callback returns a succesful result
			// Add the new item to the DOM
			this.addBlockListItem(hostNameToAdd);
		}
		catch (err) {
			window.alert(err);
		}
	}


}