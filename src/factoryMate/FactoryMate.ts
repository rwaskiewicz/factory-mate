import { FactoryTemplate } from './FactoryTemplate';

export class FactoryMate {
  public static definedConstructors: Map<string, any> = new Map();

  public static define(cns: any, initFunction: () => void) {
    FactoryMate.defineWithName(cns, cns.name, initFunction);
  }

  public static defineWithName(cns: any, alias: string, initFunction: () => void) {
    FactoryMate.storeTemplate(alias, new FactoryTemplate(cns, initFunction));
  }

  public static build(itemName: string, overrideFn?: (clazz: any) => any) {
    const clazz = this.locateConstructor(itemName);
    const clazzInstance = new clazz.classConstructor();

    const builtObject = clazz.initializationFunction(clazzInstance);
    if (overrideFn) {
      overrideFn(builtObject);
    }

    return builtObject;
  }

  public static buildMany(itemName: string, numberToBuild = 1, overrideFn?: (clazz: any) => any) {
    if (numberToBuild < 1) {
      throw new Error(`Number of Items to Build Must Be 1 or Higher. Received ${numberToBuild}`);
    }

    const createdClasses = new Array();
    for (let i = 0; i < numberToBuild; i++) {
      createdClasses.push(FactoryMate.build(itemName, overrideFn));
    }
    return createdClasses;
  }

  private static storeTemplate(alias: string, template: FactoryTemplate) {
    if (FactoryMate.definedConstructors.get(alias)) {
      throw new Error(`A template with alias '${alias}' has been registered already.`);
    }
    FactoryMate.definedConstructors.set(alias, template);
  }

  private static locateConstructor(objectName: string) {
    const clazz = FactoryMate.definedConstructors.get(objectName);

    if (clazz === undefined) {
      throw new Error(`Class with name ${objectName} is not registered to FactoryMate.`);
    }

    return clazz;
  }
}
