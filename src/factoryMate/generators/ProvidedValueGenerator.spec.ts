import { SampleItem } from '../test-fixtures/SampleItem';
import { ProvidedValueGenerator } from './ProvidedValueGenerator';

describe('ProvidedValueGenerator', () => {
    describe('nextValue(): string', () => {
        let providedValueGenerator: ProvidedValueGenerator<string>;

        beforeEach(() => {
            const providedValues = ['up', 'left', 'right'];
            providedValueGenerator = new ProvidedValueGenerator(providedValues);
        });

        it('returns the first value correctly', () => {
            const firstValue = providedValueGenerator.nextValue();

            expect(firstValue).toBe('up');
        });

        it('returns the second value correctly', () => {
            providedValueGenerator.nextValue();
            const secondValue = providedValueGenerator.nextValue();

            expect(secondValue).toBe('left');
        });

        it('returns the third value correctly', () => {
            providedValueGenerator.nextValue();
            providedValueGenerator.nextValue();
            const thirdValue = providedValueGenerator.nextValue();

            expect(thirdValue).toBe('right');
        });

        it('throws an error when no more provided values exist', () => {
            providedValueGenerator.nextValue();
            providedValueGenerator.nextValue();
            providedValueGenerator.nextValue();

            expect(() => providedValueGenerator.nextValue()).toThrowError('Out of bounds!');
        });
    });

    describe('nextValue(): number', () => {
        let providedValueGenerator: ProvidedValueGenerator<number>;

        beforeEach(() => {
            const providedValues = [12, 32, 23];
            providedValueGenerator = new ProvidedValueGenerator(providedValues);
        });

        it('returns the first value correctly', () => {
            const firstValue = providedValueGenerator.nextValue();

            expect(firstValue).toBe(12);
        });

        it('returns the second value correctly', () => {
            providedValueGenerator.nextValue();
            const secondValue = providedValueGenerator.nextValue();

            expect(secondValue).toBe(32);
        });

        it('returns the third value correctly', () => {
            providedValueGenerator.nextValue();
            providedValueGenerator.nextValue();
            const thirdValue = providedValueGenerator.nextValue();

            expect(thirdValue).toBe(23);
        });

        it('throws an error when no more provided values exist', () => {
            providedValueGenerator.nextValue();
            providedValueGenerator.nextValue();
            providedValueGenerator.nextValue();

            expect(() => providedValueGenerator.nextValue()).toThrowError('Out of bounds!');
        });
    });

    describe('nextValue(): SampleItem', () => {
        let providedValueGenerator: ProvidedValueGenerator<SampleItem>;
        let providedSampleItems: SampleItem[];

        beforeEach(() => {
            const providedSampleItemOne = new SampleItem(1, 'Sample Item 1');
            const providedSampleItemTwo = new SampleItem(2, 'Sample Item 2');
            const providedSampleItemThree = new SampleItem(3, 'Sample Item 3');
            providedSampleItems = [providedSampleItemOne, providedSampleItemTwo, providedSampleItemThree];

            providedValueGenerator = new ProvidedValueGenerator(providedSampleItems);
        });

        it('returns the first value correctly', () => {
            const firstValue = providedValueGenerator.nextValue();

            expect(firstValue.id).toBe(1);
            expect(firstValue.name).toBe('Sample Item 1');
        });

        it('returns the second value correctly', () => {
            providedValueGenerator.nextValue();
            const secondValue = providedValueGenerator.nextValue();

            expect(secondValue.id).toBe(2);
            expect(secondValue.name).toBe('Sample Item 2');
        });

        it('returns the third value correctly', () => {
            providedValueGenerator.nextValue();
            providedValueGenerator.nextValue();
            const thirdValue = providedValueGenerator.nextValue();

            expect(thirdValue.id).toBe(3);
            expect(thirdValue.name).toBe('Sample Item 3');
        });

        it('throws an error when no more provided values exist', () => {
            providedValueGenerator.nextValue();
            providedValueGenerator.nextValue();
            providedValueGenerator.nextValue();

            expect(() => providedValueGenerator.nextValue()).toThrowError('Out of bounds!');
        });
    });

    describe('nextValue(), continuous mode', () => {
        let providedValueGenerator: ProvidedValueGenerator<string>;

        beforeEach(() => {
            const providedValues = ['up', 'down'];
            providedValueGenerator = new ProvidedValueGenerator(providedValues, true);
        });

        it('returns the first value correctly', () => {
            const firstValue = providedValueGenerator.nextValue();

            expect(firstValue).toBe('up');
        });

        it('returns the second value correctly', () => {
            providedValueGenerator.nextValue();
            const secondValue = providedValueGenerator.nextValue();

            expect(secondValue).toBe('down');
        });

        it('cycles back to the beginning and returns the third value correctly', () => {
            providedValueGenerator.nextValue();
            providedValueGenerator.nextValue();
            const thirdValue = providedValueGenerator.nextValue();

            expect(thirdValue).toBe('up');
        });
    });
});
