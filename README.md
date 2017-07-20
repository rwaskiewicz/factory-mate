# FactoryMate
[![Build Status](https://travis-ci.org/rwaskiewicz/factory-mate.svg?branch=master)](https://travis-ci.org/rwaskiewicz/factory-mate)

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

## Example
An example project using FactoryMate can be found here [FactoryMateConsumer](https://github.com/rwaskiewicz/factory-mate-consumer)

## License
FactoryMate is distributed under the [MIT license](https://opensource.org/licenses/MIT)