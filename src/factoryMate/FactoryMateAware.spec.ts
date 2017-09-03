import { FactoryMateAware } from './FactoryMateAware';

describe('FactoryMateAware', () => {
  describe('Successful registry to the factory', () => {
    it('does not throw an error', () => {
      let mockObject = { name: 'fixtureFactory' } as any;
      const mockPrototype = () => { };

      mockObject = Object.setPrototypeOf(mockObject, mockPrototype);
      mockObject.prototype.define = () => { };

      expect(() => FactoryMateAware(mockObject)).not.toThrowError();
    });

    it('invokes the method exactly once', () => {
      let mockObject = { name: 'fixtureFactory' } as any;
      const mockPrototype = () => { };

      mockObject = Object.setPrototypeOf(mockObject, mockPrototype);
      const spyFunction = jasmine.createSpy('spyFunction');
      mockObject.prototype.define = spyFunction;

      FactoryMateAware(mockObject);

      expect(spyFunction).toHaveBeenCalledTimes(1);
    });
  });

  describe('Unsuccessful registry to the factory', () => {
    it('throws an error if there is no prototype on the constructor parameter', () => {
      expect(() => FactoryMateAware({})).toThrowError('The provided constructor does not have a prototype ' +
        'associated with it.');
    });

    it('throws an error if \'define\' does not exist on the prototype', () => {
      let mockObject = { name: 'fixtureFactory' };
      const mockPrototype = () => { };

      mockObject = Object.setPrototypeOf(mockObject, mockPrototype);

      expect(() => FactoryMateAware(mockObject))
        .toThrowError('fixtureFactory does not have function \'define\'.');
    });
  });
});
