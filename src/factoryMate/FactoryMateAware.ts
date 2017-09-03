// TODO: Find better way to determine use of 'Function' for the parameter
export function FactoryMateAware(constructor: any) {
  if (!constructor.prototype) {
    throw (new Error(`The provided constructor does not have a prototype associated with it.`));
  } else if (!constructor.prototype.hasOwnProperty('define')) {
    throw (new Error(`${constructor.name} does not have function \'define\'.`));
  } else {
    Object.getOwnPropertyDescriptor(constructor.prototype, 'define').value();
  }
}
