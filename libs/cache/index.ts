import { getValueFromKeyString } from '../utils/objects';

type ObjectItem<Type> = {
	key: string;
	date: Date;
	value: Type;
};

export class ObjectCache<Type> {
	ttl: number;
	polling: number;
	name?: string;
	timer: number;
	items: ObjectItem<Type>[];
	pollOnSet: boolean;
	browser: boolean;

	constructor(ttl: number, polling: number, pollOnSet: boolean = false, name?: string, browser: boolean = false) {
		this.items = [];
		this.ttl = ttl;
		this.polling = polling;
		this.name = name;
		this.pollOnSet = pollOnSet;
		this.browser = browser;

		// Restore from localStorage
		if (this.browser && this.name && localStorage.getItem(`${this.name}-cache`)) {
			this.items = JSON.parse(<string>localStorage.getItem(`${this.name}-cache`));
			for (let i = 0; i < this.items.length; i++) {
				this.items[i].date = new Date(this.items[i].date);
			}
			this.poll(false);
		}

		this.timer = setInterval(() => {
			this.poll();
		}, polling);
	}

	isExpired(item: ObjectItem<Type>) {
		var startDate = new Date();
		var seconds = (item.date.getTime() - startDate.getTime()) / 1000;

		return seconds > this.ttl;
	}

	poll(dump: boolean = true) {
		// Cleanup expired items
		this.items.forEach((item) => {
			if (this.isExpired(item)) {
				this._delete(item);
			}
		});

		// Dump to localStorage
		if (dump && this.browser && this.name) {
			localStorage.setItem(`${this.name}-cache`, JSON.stringify(this.items));
			// console.log(`Dumped ${this.name}-cache to localStorage`);
		}
	}

	delete(key: string) {
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (item.key == key) {
				this._delete(item);
			}
		}
	}

	_delete(item: ObjectItem<Type>) {
		this.items.splice(this.items.indexOf(item), 1);
	}

	set(key: string, value: Type) {
		// Check if item already exists and update it if it does
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (item.key == key) {
				item.value = value;
				item.date = new Date();
				return;
			}
		}

		// Otherwise, create a new item
		this.items.push({
			key: key,
			value: value,
			date: new Date()
		});

		if (this.pollOnSet) {
			this.poll();
		}
	}

	get(key: string) {
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (item.key == key) {
				if (this.isExpired(item)) {
					return null;
				}

				return item.value;
			}
		}

		return null;
	}

	getByObjectKey(objectKey: string, objectValue: string) {
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];

			if (getValueFromKeyString(item.value, objectKey) == objectValue) {
				if (this.isExpired(item)) {
					return null;
				}

				return item.value;
			}
		}

		return null;
	}

	getAll() {
		const result: Type[] = [];
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];

			// Check if item is expired
			if (this.isExpired(item)) {
				continue;
			}

			result.push(item.value);
		}

		return result;
	}

	has(key: string) {
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];

			if (item.key == key) {
				if (this.isExpired(item)) {
					return false;
				}
				return true;
			}
		}

		return false;
	}
}
