export class FactoryMate {
    public static definedConstructors: any[] = [];

    public static define(cns: any, initFunction: () => void) {
        FactoryMate.definedConstructors.push(
            {
                classConstructor: cns,
                initializationFunction: initFunction
            }
        );
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
            numberToBuild = 1;
        }

        const createdClasses = new Array();
        for (let i = 0; i < numberToBuild; i++) {
            createdClasses.push(FactoryMate.build(itemName, overrideFn));
        }
        return createdClasses;
    }

    private static locateConstructor(objectName: string) {
        const clazz = FactoryMate.definedConstructors.find((stored) => {
            return stored.classConstructor.name === objectName;
        });

        if (clazz === undefined) {
            throw new Error(`Class with name ${objectName} is not registed to FactoryMate.`);
        }

        return clazz;
    }
}
