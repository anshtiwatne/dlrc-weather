export function keyToTitle(key: string): string {
	return key
		.replace(/([A-Z])/g, ' $1')
		.toLowerCase()
		.replace(/\b\w/g, (char) => char.toUpperCase())
}
