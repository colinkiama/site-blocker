import { getHostname } from "./utils/urlHelper.js";
import BlockList from "./utils/blockList.js";



// Need to filter with status property for Firefox versions older
// than 88;
const filter = {
  properties: ["url", "status"],
  windowId: window.browser.windows.WINDOW_ID_CURRENT
}

async function handleUpdated(tabId, changeInfo, tabInfo) {
	const blockList = new BlockList();
	let updatedTabHostname = getHostname(tabInfo.url);

	let isInBlockList = await blockList.contains(updatedTabHostname);

	if (isInBlockList) {
		window.browser.tabs.update(tabId, {
			url: window.browser.runtime.getURL("views/site-blocked.html"),
			loadReplace: true
		});
	}
}

window.browser.tabs.onUpdated.addListener(handleUpdated, filter);