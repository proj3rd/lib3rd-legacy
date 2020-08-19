import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { todo, unimpl } from 'unimpl';
import { _ElementSetSpecs } from '../types';
import { ExtensionMarker } from '../classes/extensionMarker';
import {
  AdditionalElementSetSpecContext,
  ElementSetSpecsContext,
  RootElementSetSpecContext,
} from '../grammar/ASN_3gppParser';
import { ASN_3gppVisitor } from '../grammar/ASN_3gppVisitor';
import { AdditionalElementSetSpecVisitor } from './additionalElementSetSpecVisitor';
import { RootElementSetSpecVisitor } from './rootElementSetSpecVisitor';

/**
 * # Grammar
 * ```
 * elementSetSpecs: rootElementSetSpec (COMMA ELLIPSIS (COMMA additionalElementSetSpec)?)?
 * ```
 */
export class ElementSetSpecsVisitor
  extends AbstractParseTreeVisitor<_ElementSetSpecs>
  implements ASN_3gppVisitor<_ElementSetSpecs> {
  public visitChildren(ctx: ElementSetSpecsContext): _ElementSetSpecs {
    const elementSetSpecs: _ElementSetSpecs = [];
    const { childCount } = ctx;
    for (let i = 0; i < childCount; i++) {
      const childCtx = ctx.getChild(i);
      if (childCtx instanceof RootElementSetSpecContext) {
        const rootElementSetSpec = childCtx.accept(
          new RootElementSetSpecVisitor()
        );
        elementSetSpecs.push(rootElementSetSpec);
      } else if (childCtx instanceof AdditionalElementSetSpecContext) {
        const additionalElementSetSpec = childCtx.accept(
          new AdditionalElementSetSpecVisitor()
        );
        elementSetSpecs.push(additionalElementSetSpec);
      } else {
        switch (childCtx.text) {
          case ',': {
            break;
          }
          case '...': {
            elementSetSpecs.push(ExtensionMarker.getInstance());
            break;
          }
          default: {
            throw Error();
          }
        }
      }
    }
    return elementSetSpecs;
  }

  protected defaultResult(): _ElementSetSpecs {
    return unimpl();
  }
}