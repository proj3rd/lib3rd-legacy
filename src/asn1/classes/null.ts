import { isEmpty } from 'lodash';

import { log } from '../../utils/logging';

import { fillRow, IFormatConfig, IIe } from '../format/xlsx';
import { Base } from './base';

export class Null extends Base {
  public setConstraint(constraint: any): Null {
    if (!isEmpty(constraint)) {
      log.warn(`Null could not handle constraint ${JSON.stringify(constraint)}`);
    }
    return this;
  }

  public expand(): Null {
    return this;
  }

  public depthMax(): number {
    return 1;
  }

  public toString(): string {
    return 'NULL';
  }

  public fillWorksheet(ieElem: IIe, ws: any, row: number, col: number, depthMax: number, constants: any[],
                       formatConfig: IFormatConfig, depth?: number): [number, number] {
    ieElem.type = 'NULL';
    [row, col] = fillRow(ieElem, ws, row, col, depthMax, formatConfig, depth);
    return [row, col];
  }
}
