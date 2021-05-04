import { Controller } from "stimulus";
import { getHostname } from "../utils/urlHelper.js";
import BlockList from "../utils/blockList.js";


export default class extends Controller {
	static targets = ["url", "status", "unblockInstructions", "blockButton"]

	async connect() {
		this.url = getHostname(window.location.href);
		this.blockList = new BlockList();
		
		if (!this.url) {
			return;
		}
		
		this.urlTarget.textContent = this.url;

		this.isBlocked = await this.blockList.contains(this.url)
		this._updateElements();
		
	}

	_updateElements() {
		this._updateStatus();
		this._updateBlockButton();
		this._updateUnblockInstructions();
	}

	_updateUnblockInstructions() {
		if (this.isBlocked) {
			// Dynamically insert message below site info in dom with 
			// unblock message id (Use popup scope)
			let messageDiv = document.createElement('span');
			messageDiv.textContent = "You can unblock the site in the settings";
			messageDiv.setAttribute("data-target", "unblockInstructions");
			messageDiv.setAttribute("id", "unblock-instructions");
			messageDiv.style.display = "inline-block";

			let siteInfoBlock = this.element.querySelector(".site-info");
			siteInfoBlock.insertAdjacentElement("afterend", messageDiv);
		}
		
	}

	_updateBlockButton() {
		if (this.isBlocked) {
			this.blockButtonTarget.parentNode.removeChild(this.blockButtonTarget);
		}
	}

	_updateStatus() {
		this.statusTarget.textContent = this.isBlocked ? 
		"Blocked" : "Not Blocked"; 

	}

	navigateToSettings() {
		console.log("Navigating to settings");
		window.browser.tabs.create({
			active: true,
			url: window.browser.runtime.getURL("views/settings.html")
		});

		// Close Popup
		window.close();
	}

	async block(){
		console.log("Block current site")
		let addResult = await this.blockList.add(this.url)

		if (addResult.error) {
			console.error(addResult.error);
			return;
		}

		// After succesfull callback. Block the current site
		// Update targets as needed.
		this.isBlocked = true;
		this._updateElements();
	}
	




}

