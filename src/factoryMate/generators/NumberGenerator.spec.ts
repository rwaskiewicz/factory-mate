import { NumberGenerator } from './NumberGenerator';

describe('NumberGenerator', () => {
  describe('nextValue()', () => {
    let numberGenerator: NumberGenerator;

    describe('initialized with default parameters', () => {
      it('returns the correct value after calling the function twice', () => {
        numberGenerator = new NumberGenerator();

        const firstReturnedValue = numberGenerator.nextValue();
        const secondReturnedValue = numberGenerator.nextValue();

        expect(firstReturnedValue).toBe(1);
        expect(secondReturnedValue).toBe(2);
      });
    });

    describe('initialized with custom start parameter', () => {
      it('returns the correct value after calling the function twice', () => {
        numberGenerator = new NumberGenerator(0);

        const firstReturnedValue = numberGenerator.nextValue();
        const secondReturnedValue = numberGenerator.nextValue();

        expect(firstReturnedValue).toBe(0);
        expect(secondReturnedValue).toBe(1);
      });
    });

    describe('initialized with custom start and increment parameters', () => {
      it('returns the correct value after calling the function twice', () => {
        numberGenerator = new NumberGenerator(2, 3);

        const firstReturnedValue = numberGenerator.nextValue();
        const secondReturnedValue = numberGenerator.nextValue();

        expect(firstReturnedValue).toBe(2);
        expect(secondReturnedValue).toBe(5);
      });
    });
  });
});
