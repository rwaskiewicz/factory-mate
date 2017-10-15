export class FactoryStamp {
  public classConstructor: any;
  public initializationFunction: () => void;

  constructor(cns: any, initFunction: () => void) {
    this.classConstructor = cns;
    this.initializationFunction = initFunction;
  }
}
