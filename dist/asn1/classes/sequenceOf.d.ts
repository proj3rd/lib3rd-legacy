import { IFormatConfig, IIe } from '../format/xlsx';
import { BuiltinValue } from '../visitors/builtinValue';
import { ConstraintSpec } from '../visitors/constraintSpec';
import { IModules } from '../visitors/modules';
import { AsnType } from './asnType';
import { IConstantAndModule } from './base';
import { NamedType } from './namedType';
export declare class SequenceOf extends AsnType {
    type: AsnType | NamedType;
    expandedType: AsnType | NamedType;
    size: BuiltinValue;
    sizeMin: BuiltinValue;
    sizeMax: BuiltinValue;
    constructor(type: AsnType | NamedType);
    setConstraint(constraint: ConstraintSpec): SequenceOf;
    expand(asn1Pool: IModules, moduleName?: string, parameterList?: string[]): SequenceOf;
    depthMax(): number;
    replaceParameters(parameterMapping: {}): void;
    toString(): string;
    toStringUnexpanded(): string;
    fillWorksheet(ieElem: IIe, ws: any, row: number, col: number, depthMax: number, constants: IConstantAndModule[], formatConfig: IFormatConfig, depth?: number): [number, number];
}
