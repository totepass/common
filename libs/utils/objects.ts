export function getValueFromKeyString(object: any, key: string): string | null {
	if (!object) {
		return null;
	}
	if (key == '') {
		return object;
	}
	const firstKey = key.split('.')[0];
	const nextKey = key.split('.').splice(1).join('.');

	return getValueFromKeyString(object[firstKey], nextKey);
}