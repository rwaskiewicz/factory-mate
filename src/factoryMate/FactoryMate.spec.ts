import { FactoryMate } from './FactoryMate';

describe('FactoryMate', () => {
    // Define mocked class and the initialization function
    class MockClass {
        public mockProperty: string;
    }
    const initializationFunction = () => new MockClass();

    beforeAll(() => {
        if (FactoryMate.definedConstructors.length !== 0) {
            fail('The initial value of the constructors should be zero');
        }
        FactoryMate.define(MockClass, initializationFunction);
    });

    describe('define()', () => {
        // Define a constructor for testing
        let definedContructor;

        beforeAll(() => {
            definedContructor = FactoryMate.definedConstructors[0];
        });

        it('adds an object to the constructors list exactly once', () => {
            expect(FactoryMate.definedConstructors.length).toBe(1);
        });

        it('has the correct constructor', () => {
            expect(definedContructor.classConstructor).toEqual(MockClass);
        });

        it('has the correct anonymous function', () => {
            expect(definedContructor.initializationFunction).toEqual(initializationFunction);
        });
    });

    describe('build()', () => {
        it('throws an error if the specified class is not registered', () => {
            expect(() => FactoryMate.build('UnregisteredClassName'))
                .toThrowError('Class with name UnregisteredClassName is not registered to FactoryMate.');
        });

        describe('no override method is provided', () => {
            it('calls the constructor when no override method is provided', () => {
                const mockClass: MockClass = FactoryMate.build(MockClass.name);

                expect(mockClass).toBeDefined();
                expect(mockClass.mockProperty).toBeUndefined();
            });
        });

        describe('an override method is provided', () => {
            it('calls the provided override method', () => {
                const mockClass: MockClass = FactoryMate.build(MockClass.name, (builtObject) => {
                    builtObject.mockProperty = 'fooBar';
                });

                expect(mockClass.mockProperty).toBe('fooBar');
            });
        });
    });

    describe('buildMany()', () => {
        it('returns the provided count of the desired object', () => {
            const mockClassList = FactoryMate.buildMany(MockClass.name, 2);

            expect(mockClassList.length).toBe(2);
        });

        it('returns the one object when no value is provided', () => {
            const mockClassList = FactoryMate.buildMany(MockClass.name);

            expect(mockClassList.length).toBe(1);
        });

        it('returns the one object when a value less than one is provided', () => {
            const mockClassList = FactoryMate.buildMany(MockClass.name, -2);

            expect(mockClassList.length).toBe(1);
        });
    });
});
