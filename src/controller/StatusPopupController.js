import { Controller } from "stimulus";

export default class extends Controller {
	static targets = ["url", "status", "unblockInstructions", "blockButton"]

	connect() {
		console.log("Status Popup is active!");
	}

	navigateToSettings() {
		console.log("Navigating to settings");
		window.browser.tabs.create({
			active: true,
			url: window.browser.runtime.getURL("views/settings.html")
		});

	}




}

