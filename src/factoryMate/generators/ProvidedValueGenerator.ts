import { Generator } from './Generator';

export class ProvidedValueGenerator<T> implements Generator<T> {
    private values: T[];
    private currentIndex: number;
    private continuousMode: boolean;

    constructor(providedValues: T[], continuousMode = false) {
        this.values = providedValues;
        this.currentIndex = 0;
        this.continuousMode = continuousMode;
    }

    public nextValue(): T {
        if (this.isCurrentIndexOutOfBounds()) {
            if (this.continuousMode) {
                this.currentIndex = 0;
            } else {
                throw new Error('Out of bounds!');
            }
        }

        return this.values[this.currentIndex++];
    }

    private isCurrentIndexOutOfBounds(): boolean {
        return this.currentIndex + 1 > this.values.length;
    }
}
