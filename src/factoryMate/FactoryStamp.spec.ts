import { FactoryStamp } from './FactoryStamp';
import { SampleItem } from './test-fixtures/SampleItem';

describe('FactoryStamp', () => {
  describe('Instantiation', () => {
    const alias = SampleItem.name;
    const classConstructor = SampleItem;
    const initFunction = () => {};
    let factoryStamp: FactoryStamp;

    beforeEach(() => {
      factoryStamp = new FactoryStamp(classConstructor, alias, initFunction);
    });

    it('sets the classConstructor property correctly', () => {
      expect(factoryStamp.classConstructor).toBeDefined();
      expect(factoryStamp.classConstructor).toEqual(SampleItem);
    });

    it('sets the classAlias property correctly', () => {
      expect(factoryStamp.classAlias).toBeDefined();
      expect(factoryStamp.classAlias).toEqual('SampleItem');
    });

    it('sets the initializationFunction property correctly', () => {
      expect(factoryStamp.initializationFunction).toBeDefined();
      expect(factoryStamp.initializationFunction).toEqual(initFunction);
    });
  });
});
