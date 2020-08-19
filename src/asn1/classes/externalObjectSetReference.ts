export class ExternalObjectSetReference {
  public moduleReference: string;
  public objectSetReference: string;

  private externalObjectSetReferenceTag: undefined;

  constructor(moduleReference: string, objectSetReference: string) {
    this.moduleReference = moduleReference;
    this.objectSetReference = objectSetReference;
  }

  public toString(): string {
    return `${this.moduleReference}.${this.objectSetReference}`;
  }
}