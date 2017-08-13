# FactoryMate
[![Build Status](https://travis-ci.org/rwaskiewicz/factory-mate.svg?branch=develop)](https://travis-ci.org/rwaskiewicz/factory-mate)
[![npm version](https://badge.fury.io/js/factory-mate.svg)](https://badge.fury.io/js/factory-mate)
[![Coverage Status](https://coveralls.io/repos/github/rwaskiewicz/factory-mate/badge.svg?branch=develop)](https://coveralls.io/github/rwaskiewicz/factory-mate?branch=develop)

FactoryMate is a TypeScript-based fixture library for instantiating domain objects for testing purposes, inspired by 
the [Factory Duke](https://github.com/regis-leray/factory_duke) project.

## Getting Started

FactoryMate can be installed via NPM:
```
npm install --save-dev factory-mate
```

## Usage

Given a simple domain object:

``` typescript
// GroceryItem.ts
export class GroceryItem {
    public groceryName = '';
}
```
A factory can be registered using `FactoryMate.define()`:

``` typescript
import { FactoryMate } from 'factory-mate';
import { GroceryItem } from './GroceryItem';

FactoryMate.define(GroceryItem, (): GroceryItem => {
    const groceryItem = new GroceryItem();
    groceryItem.groceryName = 'crispy chips';
    return groceryItem;
});
```

`FactoryMate.define()` takes two arguments:
1. The class being registered 
2. An initialization function - a function that returns the 'template' of the object. 

Every time FactoryMate is used to create an instance of the registered object, that instance's properties will have the same values as those defined in template. To build an instance of a registered class:

``` typescript
const groceryItem: GroceryItem = FactoryMate.build(GroceryItem.name);

console.log(JSON.stringify(groceryItem)); // '{"groceryName":"crispy chips"}'
```

### Factory Classes
It is recommended that a factory class be created for each domain object.  Factory classes can  be created by annotating the new class with `@FactoryMateAware` and calling the static `FactoryMate.define()` method in that class:
``` typescript
// GroceryItemFactory.ts
import { FactoryMate, FactoryMateAware } from 'factory-mate';
import { GroceryItem } from './GroceryItem';

@FactoryMateAware
export class GroceryItemFactory {
    // The @FactoryMateAware annotation will automatically call the define() function at runtime
    public define() { 
        FactoryMate.define(GroceryItem, (): GroceryItem => {
            const groceryItem = new GroceryItem();
            groceryItem.groceryName = 'crispy chips';
            return groceryItem;
        });
    }
}
```

### Additional Building Methods
#### Overriding a Template's Variables
If for specific tests there is a need to override one or more variables in the template, this can be accomplished via an optional parameter to `build`:

``` typescript
const groceryItem: GroceryItem = FactoryMate.build(GroceryItem.name,
      (u: GroceryItem) => {
        u.groceryName = 'chunky cookies';
      });
```

#### Building Many of the Same Object
To build several objects of the same type:
``` typescript
const groceryItems: GroceryItem[] = FactoryMate.buildMany(GroceryItem.name, 3);
```

### Sequence Generation
FactoryMate supports infinite, numerical sequence generation via the ```NumberGenerator``` class.  This can be helpful for the purposes of generating ID values for domain objects to better represent real world scenarios (e.g. keys in a data store) 

In order to add sequential generation support to an entity, it can be imported into it's factory as such:
``` typescript
import { FactoryMate, FactoryMateAware } from 'factory-mate';
import { NumberGenerator } from 'factory-mate';
import { GroceryItem } from './GroceryItem';

@FactoryMateAware
export class GroceryItemFactory {
    public define() {
        // Defines the NumberGenerator instance to be used across all calls to FactoryMate.build(GroceryItem.name);
        const numberGenerator = new NumberGenerator();

        FactoryMate.define(GroceryItem, (): GroceryItem => {
            const groceryItem = new GroceryItem();
            // The nextValue() method retrieves the next value in the sequence
            groceryItem.id = numberGenerator.nextValue();
            groceryItem.groceryName = 'chewy cookies';
            return groceryItem;
        });
    }
}
```
Using the factory method above, three sequential calls to ```FactoryMate.build(GroceryItem.name)``` will result in the following:

``` typescript
const groceryItem1: GroceryItem = FactoryMate.build(GroceryItem.name);
const groceryItem2: GroceryItem = FactoryMate.build(GroceryItem.name);
const groceryItem3: GroceryItem = FactoryMate.build(GroceryItem.name);

console.log(JSON.stringify(groceryItem1)); //'{"id":1,"groceryName":"chewy cookies"}'
console.log(JSON.stringify(groceryItem2)); //'{"id":2,"groceryName":"chewy cookies"}'
console.log(JSON.stringify(groceryItem3)); //'{"id":3,"groceryName":"chewy cookies"}'
```
#### Changing sequence values
By default, ```NumberGenerator``` starts at a value of 1 and increments by 1.  These values can be altered at instantiation time if desired
``` typescript
// Start at one, increment by one: 1, 2, 3 ...
const numberGenerator = new NumberGenerator();
// Start at one, increment by two: 1, 3, 5 ...
const numberGenerator = new NumberGenerator(1, 2);
// Start at zero, increment by one: 0, 1, 2, ...
const numberGenerator = new NumberGenerator(0);
```

### ProvidedValueGenerator

FactoryMate also supports finite sequence generation by means of the `ProvidedValueGenerator` class. `ProvidedValueGenerator` is capable of returning values from an `Array` of numbers, strings, objects, etc. that was provided to the class upon instantiation:

``` typescript
const providedValueGenerator = new ProvidedValueGenerator(['up', 'left', 'right']);
const firstValue = providedValueGenerator.nextValue();  // 'up'
const secondValue = providedValueGenerator.nextValue(); // 'left'
const thirdValue = providedValueGenerator.nextValue();  // 'right'
const fourthValue = providedValueGenerator.nextValue(); // Error: 'Out of bounds!'
```

## Example
An example project using FactoryMate can be found here [FactoryMateConsumer](https://github.com/rwaskiewicz/factory-mate-consumer)

## License
FactoryMate is distributed under the [MIT license](https://opensource.org/licenses/MIT)