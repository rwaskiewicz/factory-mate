export class FactoryStamp {
  public classAlias: string;
  public classConstructor: any;
  public initializationFunction: () => void;

  constructor(cns: any, alias: string, initFunction: () => void) {
    this.classConstructor = cns;
    this.classAlias = alias;
    this.initializationFunction = initFunction;
  }
}
