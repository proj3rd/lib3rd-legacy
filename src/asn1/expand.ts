import { cloneDeep } from 'lodash';

import { IMsgIe } from './format/common';
import { IModules } from './visitors/modules';

export function expand(msgIe: IMsgIe, asn1Pool: IModules): any {
  const msgIeClone = cloneDeep(msgIe);
  msgIeClone.definition.expand(asn1Pool, undefined, (msgIeClone.definition as any).parameterList);
  return msgIeClone;
}
