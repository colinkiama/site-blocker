import { Controller } from "stimulus";
import { getHostName } from "../utils/urlHelper.js";

export default class extends Controller {
	static targets = ["url", "status", "unblockInstructions", "blockButton"]

	connect() {
		this.url = getHostName(window.location.href);
		if (!this.url) {
			return;
		}
		
		this.urlTarget.textContent = this.url;

		// this.isBlocked = Blocklist.contains(this.url)
		this.isBlocked = true;
		// if (this.isBlocked) {
		this.updateStatus();
		// }

		this.updateBlockButton();
		this.updateUnblockInstructions();


	}
	updateUnblockInstructions() {
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

	updateBlockButton() {
		if (this.isBlocked) {
			this.blockButtonTarget.parentNode.removeChild(this.blockButtonTarget);
		}
	}

	updateStatus() {
		this.statusTarget.textContent = this.isBlocked ? 
		"Blocked" : "Not Blocked"; 

	}

	navigateToSettings() {
		console.log("Navigating to settings");
		window.browser.tabs.create({
			active: true,
			url: window.browser.runtime.getURL("views/settings.html")
		});

		// TODO: Close Popup
	}

	block(){
		console.log("Block current site")
		// Blocklist.add(this.url)
	}
	




}

