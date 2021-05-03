export function getHostName(urlString){
	return new URL(urlString).hostname;
}