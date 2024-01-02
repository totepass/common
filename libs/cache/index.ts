import { getValueFromKeyString } from "../utils/objects";

type ObjectItem<Type> = {
    key: string;
    date: Date;
    value: Type;
};

/**
 * ObjectCache: A cache for objects, that follows the Map interface
 * @param itemTtl `number` Time to live for each item in milliseconds. Default: 5 minutes
 * @param pollingTime `number` Time between each poll in milliseconds. Default: 1 minute
 * @param pollOnOperation `boolean` Whether to poll on each operation or not. Default: true
 */
export class ObjectCache<Type> extends Map<string, Type> {
    itemTtl: number;
    pollingTime: number;
    items: Map<string, Type>;
    dates: Map<string, Date>;
    pollOnOperation: boolean;

    timer: number;

    constructor(iterable?: readonly (readonly [string, Type])[] | null) {
        super();

        // Set items and dates
        this.items = new Map<string, Type>(iterable);
        this.dates = new Map<string, Date>();
        if (iterable) {
            iterable.forEach((item) => {
                this.dates.set(item[0], new Date());
            });
        }

        this.itemTtl = 5 * 60 * 1000; // 5 minutes
        this.pollingTime = 60 * 1000; // 1 minute
        this.pollOnOperation = true;

        // Set timer
        this.timer = setInterval(() => {
            this._refreshItems();
        }, this.pollingTime);
    }

    setItemTtl(ttl: number) {
        this.itemTtl = ttl;
    }

    setPollingTime(time: number, pollOnOperation: boolean = false) {
        this.pollingTime = time;
        this.pollOnOperation = pollOnOperation;

        // Reset timer
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this._refreshItems();
        }, this.pollingTime);
    }

    get size(): number {
        return this.items.size;
    }

    [Symbol.iterator](): IterableIterator<[string, Type]> {
        return this.items[Symbol.iterator]();
    }

    clear(): void {
        this.items.clear();
        this.dates.clear();
    }

    delete(key: string): boolean {
        const result = this.items.delete(key);
        this.dates.delete(key);

        if (this.pollOnOperation) {
            this._refreshItems();
        }

        return result;
    }

    entries(): IterableIterator<[string, Type]> {
        return this.items.entries();
    }

    forEach(callbackfn: (value: Type, key: string, map: Map<string, Type>) => void, thisArg?: any): void {
        this.items.forEach(callbackfn, thisArg);
    }

    get(key: string): Type | undefined {
        // Check if item is expired or not
        const date = this.dates.get(key);
        if (!date) {
            return undefined;
        }

        if (this.isExpired(key)) {
            return undefined;
        }

        if (this.pollOnOperation) {
            this._refreshItems();
        }

        return this.items.get(key);
    }

    has(key: string): boolean {
        const date = this.dates.get(key);
        if (!date) {
            return false;
        }

        if (this.isExpired(key)) {
            return false;
        }

        if (this.pollOnOperation) {
            this._refreshItems();
        }

        return this.items.has(key);
    }

    keys(): IterableIterator<string> {
        return this.items.keys();
    }

    set(key: string, value: Type): this {
        this.items.set(key, value);
        this.dates.set(key, new Date());

        if (this.pollOnOperation) {
            this._refreshItems();
        }

        return this;
    }

    values(): IterableIterator<Type> {
        return this.items.values();
    }

    isExpired(key: string): boolean {
        const date = this.dates.get(key);
        if (!date) {
            return true;
        }
        
        if (new Date().getTime() - date.getTime() > this.itemTtl) {
            return true;
        } else {
            return false;
        }
    }

    _refreshItems() {
        const now = new Date();
        const itemsToDelete: string[] = [];

        this.dates.forEach((date, key) => {
            if (this.isExpired(key)) {
                itemsToDelete.push(key);
            }
        });

        itemsToDelete.forEach((key) => {
            this.delete(key);
        });
    }

    getByObjectKey(objectKey: string, objectValue: string): Type | null {
        const result: { key: string; value: Type }[] = [];
        const keys = this.keys();
        const nextKey = keys.next();

        while (!nextKey.done) {
            const key = nextKey.value;
            if (this.isExpired(key)) {
                continue;
            }

            const value = this.get(key);
            if (value && getValueFromKeyString(value, objectKey) == objectValue) {
                return value;
            }
        }

        return null;
    }

    getAll(): { key: string; value: Type }[] {
        const result: { key: string; value: Type }[] = [];
        const keys = this.keys();
        const nextKey = keys.next();

        while (!nextKey.done) {
            const key = nextKey.value;
            if (this.isExpired(key)) {
                continue;
            }

            const value = this.get(key);
            if (value) {
                result.push({ key, value });
            }
        }

        if (this.pollOnOperation) {
            this._refreshItems();
        }

        return result;
    }
}
