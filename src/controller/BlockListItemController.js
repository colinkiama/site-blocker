import { Controller } from "stimulus";
import { getHostname } from "../utils/URLHelper.js"; 

export default class extends Controller {
	static values = {url: String};

	connect() {
		console.log("I'm a block list item!");
		console.log("Here is my url:", this.urlValue);
	}

	delete() {
		// Blocklist.remove(this.urlValue);
		// On successful callback of remove function, 
		// remove the element from the DOM
		this.element.parentNode.removeChild(this.element);
	}
    
	
}