import { FactoryTemplate } from './FactoryTemplate';
import { SampleItem } from './test-fixtures/SampleItem';

describe('FactoryTemplate', () => {
  describe('Instantiation', () => {
    const classConstructor = SampleItem;
    const initFunction = () => {};
    let factoryTemplate: FactoryTemplate;

    beforeEach(() => {
      factoryTemplate = new FactoryTemplate(classConstructor, initFunction);
    });

    it('sets the classConstructor property correctly', () => {
      expect(factoryTemplate.classConstructor).toBeDefined();
      expect(factoryTemplate.classConstructor).toEqual(SampleItem);
    });

    it('sets the initializationFunction property correctly', () => {
      expect(factoryTemplate.initializationFunction).toBeDefined();
      expect(factoryTemplate.initializationFunction).toEqual(initFunction);
    });
  });
});
