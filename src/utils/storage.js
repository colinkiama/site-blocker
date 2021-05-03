export function load(key) {
	return browser.storage.sync.get(key);
}

export function save(key, value) {
	return browser.storage.sync.set(key, value);
}