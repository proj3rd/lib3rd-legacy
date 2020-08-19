import { todo } from 'unimpl';
import { IParameterMapping } from '../expander';
import { DefinedObjectClass } from './asnType';
import { Modules } from './modules';
import { ObjectSet } from './objectSet';

/**
 * X.681 clause 12.1
 * ```
 * name definedObjectClass ::= objectSet
 * ```
 */
export class ObjectSetAssignment {
  public name: string;
  public definedObjectClass: DefinedObjectClass;
  public objectSet: ObjectSet;

  private objectSetAssignmentTag: undefined;

  constructor(
    name: string,
    definedObjectClass: DefinedObjectClass,
    objectSet: ObjectSet
  ) {
    this.name = name;
    this.definedObjectClass = definedObjectClass;
    this.objectSet = objectSet;
  }

  public expand(
    modules: Modules,
    parameterMappings: IParameterMapping[]
  ): ObjectSetAssignment {
    return todo();
  }

  public toString(): string {
    return `${
      this.name
    } ${this.definedObjectClass.toString()} ::= ${this.objectSet.toString()}`;
  }
}