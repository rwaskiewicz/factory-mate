# Release Notes
## [v1.3.2](https://github.com/rwaskiewicz/factory-mate/compare/v1.3.1...develop) - Unreleased
- Renamed `FactoryStamp` to `FactoryTemplate` to be more consistent in naming
- Updated template storage to use a Set
- Made definition of `FactoryMateAware` ctor more succinct in its parameter type definition (no longer uses `any`)

## [v1.3.1](https://github.com/rwaskiewicz/factory-mate/compare/v1.3.0...v1.3.1) - September 28, 2017
- Refactored `FactoryStamp` into it's own class for storing templates
- Updated `FactoryMate#buildMany` to throw an error when the number of items to build is less than one
- Internal change from 4 to 2 spaces for indentation

## [v1.3.0](https://github.com/rwaskiewicz/factory-mate/compare/v1.2.1...v1.3.0) - September 3, 2017
- Added ability to created named/aliased templates

## [v1.2.1](https://github.com/rwaskiewicz/factory-mate/compare/v1.2.0...v1.2.1) - August 19, 2017
- Added infinite sequence support to `ProvidedValueGenerator`

## [v1.2.0](https://github.com/rwaskiewicz/factory-mate/compare/v1.1.0...v1.2.0) - August 13, 2017
- Create `ProvidedValueGenerator` class for generating finite sequences of generic objects
- Integrated Coveralls to the project

## [v1.1.0](https://github.com/rwaskiewicz/factory-mate/compare/v1.0.2...v1.1.0) - August 6, 2017
- Added `NumberGenerator` for finite sequence generation

## [v1.0.2](https://github.com/rwaskiewicz/factory-mate/compare/v1.0.1...v1.0.2) - July 22, 2017
- Fixed minor typo in exception thrown when unregistered class is attempted to bu built
- Added Travis CI
- Added Linting 
- Lots of Documentation added to the project

## [v1.0.1](https://github.com/rwaskiewicz/factory-mate/compare/v1.0.0...v1.0.1) - July 9, 2017
- All the same features as v1.0.0, with a new patch version! (`npm publish` was run from the wrong local directory 
for v1.0.0 and therefore had to be republished with a new patch version)

## [v1.0.0](https://github.com/rwaskiewicz/factory-mate/commit/c9a6180ba17b90c9edfd33f8e1fb843ac44d2c33) - July 9, 2017
Initial features include:
- Defining and auto-storing object templates via FactoryMateAware annotation
- Building one to many of an entity
