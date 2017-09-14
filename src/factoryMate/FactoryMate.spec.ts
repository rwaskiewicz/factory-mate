import { FactoryMate } from './FactoryMate';

import { SampleItem } from './test-fixtures/SampleItem';
import { SampleItemWithPrice } from './test-fixtures/SampleItemWithPrice';

describe('FactoryMate', () => {
  // These initialization functions will be used throughout the test suite
  const sampleItemInitializer = () => new SampleItem(1, 'Sample Item Name');
  const sampleItemWithPriceInitializer = () => new SampleItemWithPrice(2, 'Priced Sample Item Name', 3.50);

  beforeAll(() => {
    if (FactoryMate.definedConstructors.length !== 0) {
      fail('The initial value of the constructors should be zero');
    }
    FactoryMate.define(SampleItem, sampleItemInitializer);
    FactoryMate.defineWithName(SampleItemWithPrice, 'MockSampleItemWithPrice', sampleItemWithPriceInitializer);
  });

  describe('define()', () => {
    let definedConstructor;

    beforeAll(() => {
      definedConstructor = FactoryMate.definedConstructors[0];
    });

    it('has the correct constructor', () => {
      expect(definedConstructor.classConstructor).toEqual(SampleItem);
    });

    it('has the correct anonymous function', () => {
      expect(definedConstructor.initializationFunction).toEqual(sampleItemInitializer);
    });
  });

  describe('defineWithName()', () => {
    let definedConstructor;

    beforeAll(() => {
      definedConstructor = FactoryMate.definedConstructors[1];
    });

    it('has the correct constructor', () => {
      expect(definedConstructor.classConstructor).toEqual(SampleItemWithPrice);
    });

    it('has the correct anonymous function', () => {
      expect(definedConstructor.initializationFunction).toEqual(sampleItemWithPriceInitializer);
    });
  });

  describe('build()', () => {
    describe('default name', () => {
      it('throws an error if the specified class is not registered', () => {
        expect(() => FactoryMate.build('UnregisteredClassName'))
          .toThrowError('Class with name UnregisteredClassName is not registered to FactoryMate.');
      });

      describe('no override method is provided', () => {
        it('calls the constructor when no override method is provided', () => {
          const mockSampleItem: SampleItem = FactoryMate.build(SampleItem.name);

          expect(mockSampleItem).toBeDefined();
          expect(mockSampleItem.id).toBe(1);
          expect(mockSampleItem.name).toBe('Sample Item Name');
        });
      });

      describe('an override method is provided', () => {
        it('calls the provided override method', () => {
          const mockSampleItem: SampleItem = FactoryMate.build(SampleItem.name, (builtObject) => {
            builtObject.id = 2;
            builtObject.name = 'Overridden Property Name';
          });

          expect(mockSampleItem.id).toBe(2);
          expect(mockSampleItem.name).toBe('Overridden Property Name');
        });
      });
    });

    describe('specifying class name', () => {
      describe('no override method is provided', () => {
        it('calls the constructor when no override method is provided', () => {
          const mockSampleItem: SampleItem = FactoryMate.build('SampleItem');

          expect(mockSampleItem).toBeDefined();
          expect(mockSampleItem.id).toBe(1);
          expect(mockSampleItem.name).toBe('Sample Item Name');
        });
      });

      describe('an override method is provided', () => {
        it('calls the provided override method', () => {
          const mockSampleItem: SampleItemWithPrice = FactoryMate.build('MockSampleItemWithPrice',
            (builtObject) => {
              builtObject.id = 3;
              builtObject.name = 'Overridden Property Name';
              builtObject.price = 0.99;
            });

          expect(mockSampleItem.id).toBe(3);
          expect(mockSampleItem.name).toBe('Overridden Property Name');
          expect(mockSampleItem.price).toBe(0.99);
        });
      });
    });

    describe('specifying class alias', () => {
      describe('no override method is provided', () => {
        it('calls the constructor when no override method is provided', () => {
          const mockSampleItem: SampleItemWithPrice = FactoryMate.build('MockSampleItemWithPrice');

          expect(mockSampleItem).toBeDefined();
          expect(mockSampleItem.id).toBe(2);
          expect(mockSampleItem.name).toBe('Priced Sample Item Name');
        });
      });

      describe('an override method is provided', () => {
        it('calls the provided override method', () => {
          const mockSampleItem: SampleItem = FactoryMate.build('MockSampleItemWithPrice', (builtObject) => {
            builtObject.id = 2;
            builtObject.name = 'Overridden Property Name';
          });

          expect(mockSampleItem.id).toBe(2);
          expect(mockSampleItem.name).toBe('Overridden Property Name');
        });
      });
    });
  });

  describe('buildMany()', () => {
    describe('default name', () => {
      it('returns the provided count of the desired object', () => {
        const mockSampleItemList = FactoryMate.buildMany(SampleItem.name, 2);

        expect(mockSampleItemList.length).toBe(2);
      });

      it('returns the one object when no value is provided', () => {
        const mockSampleItemList = FactoryMate.buildMany(SampleItem.name);

        expect(mockSampleItemList.length).toBe(1);
      });

      it('throws an error when a value less than one is provided', () => {
        expect(() => FactoryMate.buildMany(SampleItem.name, -2))
          .toThrowError('Number of Items to Build Must Be 1 or Higher. Received -2');
      });
    });

    describe('specifying class name', () => {
      it('returns a class of the correct type', () => {
        const mockSampleItemList = FactoryMate.buildMany('SampleItem', 3);

        expect(mockSampleItemList.length).toBe(3);
        mockSampleItemList.forEach((mockSampleItem) => {
          expect(mockSampleItem instanceof SampleItem).toBeTruthy();
        });
      });
    });

    describe('specifying class alias', () => {
      it('returns a class of the correct type', () => {
        const mockSampleItemList = FactoryMate.buildMany('MockSampleItemWithPrice', 3);

        expect(mockSampleItemList.length).toBe(3);
        mockSampleItemList.forEach((mockSampleItem) => {
          expect(mockSampleItem instanceof SampleItemWithPrice).toBeTruthy();
        });
      });
    });
  });
});
