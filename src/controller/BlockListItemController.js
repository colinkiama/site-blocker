import { Controller } from "stimulus";
import BlockList from "../utils/blockList.js";

const blockList = new BlockList();

export default class extends Controller {
	static values = {url: String};

	connect() {
		console.log("I'm a block list item!");
		console.log("Here is my url:", this.urlValue);
	}

	async delete() {
		let deletionResult = await blockList.remove(this.urlValue);
		if (deletionResult.error) {
			console.log(deletionResult.error);
			return;
		}

		this.element.parentNode.removeChild(this.element);
	}
	
}