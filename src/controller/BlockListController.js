import { Controller } from "stimulus";

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
		console.log("Button");
		let url = window.prompt("Enter a url to block");
	}


}