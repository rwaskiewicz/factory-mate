import { Generator } from './Generator';

export class NumberGenerator implements Generator<number> {
    private currentValue: number;
    private increment: number;

    constructor(currentValue = 1, increment = 1) {
        this.currentValue = currentValue;
        this.increment = increment;
    }

    public nextValue(): number {
        const nextValue = this.currentValue;
        this.currentValue += this.increment;
        return nextValue;
    }
}
