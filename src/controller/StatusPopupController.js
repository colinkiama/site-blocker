import { Controller } from "stimulus";
import { getHostName } from "../utils/URLHelper.js";

export default class extends Controller {
	static targets = ["url", "status", "unblockInstructions", "blockButton"]

	connect() {
		this.url = getHostName(window.location.href);
		if (this.url) {
			this.urlTarget.textContent = this.url;
		}
	}

	navigateToSettings() {
		console.log("Navigating to settings");
		window.browser.tabs.create({
			active: true,
			url: window.browser.runtime.getURL("views/settings.html")
		});
	}

	block(){
		console.log("Block current site")
		
	}
	




}

