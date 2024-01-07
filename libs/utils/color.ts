// Taken from Open Color
export const colors: { [key: string]: string } = {
	red: '#c92a2a',
	pink: '#d6336c',
	violet: '#5f3dc4',
	blue: '#3b5bdb',
	cyan: '#0c8599',
	teal: '#099268',
	green: '#37b24d',
	lime: '#66a80f',
	yellow: '#fcc419',
	orange: '#e8590c'
};

export function getColorFromString(str: string) {
	const hash = str.split('').reduce((acc, char) => {
		return acc + char.charCodeAt(0);
	}, 0);

	const colorKeys = Object.keys(colors);
	const colorIndex = hash % colorKeys.length;

	return colors[colorKeys[colorIndex]];
}
