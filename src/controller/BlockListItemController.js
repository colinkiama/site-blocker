import { Controller } from "stimulus";
import BlockList from "../utils/blockList.js";

export default class extends Controller {
	static values = {url: String};

	connect() {
		this.blockList = new BlockList();
		console.log("I'm a block list item!");
		console.log("Here is my url:", this.urlValue);
	}

	delete() {
		this.blockList.remove(this.urlValue);
		// On successful callback of remove function, 
		// remove the element from the DOM
		this.element.parentNode.removeChild(this.element);
	}
	
}