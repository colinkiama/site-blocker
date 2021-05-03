export function getHostName(urlString){
	let hostname;					
	
	try {
		hostname = new URL(urlString).hostname
		return hostname;
	}
	catch (err) {
		// For now just add "www." to the beginning of the string if it's not there already!
		hostname = urlString;

		if (!urlString.startsWith("www.")) {
			hostname = "www." + urlString;
		}
	}

	return hostname;
}