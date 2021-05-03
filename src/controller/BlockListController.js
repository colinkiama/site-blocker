import { Controller } from "stimulus";
import { getHostName } from "../utils/URLHelper.js"; 

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
	}

	add() {
		let url = window.prompt("Enter a url to block");

		try{
			let hostNameToAdd = getHostName(url);
			console.log(`Adding ${hostNameToAdd} to block list!`);
		}
		catch (err) {
			window.alert(err);
		}
	}


}