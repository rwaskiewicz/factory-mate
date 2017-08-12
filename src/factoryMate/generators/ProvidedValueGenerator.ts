import { Generator } from './Generator';

export class ProvidedValueGenerator<T> implements Generator<T> {
    private values: T[];
    private currentIndex: number;

    constructor(providedValues: T[]) {
        this.values = providedValues;
        this.currentIndex = 0;
    }

    public nextValue(): T {
        if (this.currentIndex + 1 > this.values.length) {
            throw new Error('Out of bounds!');
        }

        return this.values[this.currentIndex++];
    }
}
