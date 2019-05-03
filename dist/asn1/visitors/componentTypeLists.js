"use strict";
exports.__esModule = true;
var logging_1 = require("../../utils/logging");
var utils_1 = require("../utils");
var extensionAndException_1 = require("./extensionAndException");
var optionalExtensionMarker_1 = require("./optionalExtensionMarker");
/**
 * ANTRL4 grammar
 * ```
 *  componentTypeLists :
 *     rootComponentTypeList (COMMA  extensionAndException  extensionAdditions
 *      (optionalExtensionMarker|(EXTENSTIONENDMARKER  COMMA  rootComponentTypeList)))?
 *    |  extensionAndException  extensionAdditions
 *      (optionalExtensionMarker | (EXTENSTIONENDMARKER  COMMA    rootComponentTypeList))
 * ```
 */
var ComponentTypeListsVisitor = /** @class */ (function () {
    function ComponentTypeListsVisitor() {
    }
    ComponentTypeListsVisitor.prototype.visitChildren = function (componentTypeListsCtx) {
        var childCtxes = componentTypeListsCtx.children;
        var componentTypeLists = null;
        switch (utils_1.getContextName(childCtxes[0])) {
            case 'rootComponentTypeList': {
                var rootComponentTypeListCtx = childCtxes[0];
                componentTypeLists = rootComponentTypeListCtx.accept(new RootComponentTypeListVisitor());
                var extensionAndExceptionCtx = childCtxes[2];
                if (extensionAndExceptionCtx) {
                    componentTypeLists.splice.apply(componentTypeLists, [componentTypeLists.length, 0].concat(extensionAndExceptionCtx.accept(new extensionAndException_1.ExtensionAndExceptionVisitor())));
                }
                var extensionAdditionsCtx = childCtxes[3];
                if (extensionAdditionsCtx) {
                    componentTypeLists.splice.apply(componentTypeLists, [componentTypeLists.length, 0].concat(extensionAdditionsCtx.accept(new ExtensionAdditionsVisitor())));
                }
                switch (childCtxes.length) {
                    case 1: {
                        break;
                    }
                    case 5: {
                        var optionalExtensionMarkerCtx = childCtxes[4];
                        var optionalExtensionMarker = optionalExtensionMarkerCtx.accept(new optionalExtensionMarker_1.OptionalExtensionMarkerVisitor());
                        if (optionalExtensionMarker) {
                            componentTypeLists.push(optionalExtensionMarker);
                        }
                        break;
                    }
                    case 7: {
                        var extendedRootComponentTypeListCtx = childCtxes[6];
                        componentTypeLists.splice.apply(componentTypeLists, [componentTypeLists.length, 0].concat(extendedRootComponentTypeListCtx.accept(new RootComponentTypeListVisitor())));
                        break;
                    }
                    default: {
                        logging_1.log.warn(utils_1.getLogWithAsn1(componentTypeListsCtx, 'Not supported ASN1:'));
                        break;
                    }
                }
                // TODO
                break;
            }
            case 'extensionAndException': {
                var extensionAndExceptionCtx = childCtxes[0];
                componentTypeLists.splice.apply(componentTypeLists, [componentTypeLists.length, 0].concat(extensionAndExceptionCtx.accept(new extensionAndException_1.ExtensionAndExceptionVisitor())));
                var extensionAdditionsCtx = childCtxes[1];
                componentTypeLists.splice.apply(componentTypeLists, [componentTypeLists.length, 0].concat(extensionAdditionsCtx.accept(new ExtensionAdditionsVisitor())));
                switch (childCtxes.length) {
                    case 3: {
                        var optionalExtensionMarkerCtx = childCtxes[2];
                        var optionalExtensionMarker = optionalExtensionMarkerCtx.accept(new optionalExtensionMarker_1.OptionalExtensionMarkerVisitor());
                        if (optionalExtensionMarker) {
                            componentTypeLists.push(optionalExtensionMarker);
                        }
                        break;
                    }
                    case 5: {
                        var extendedRootComponentTypeListCtx = childCtxes[4];
                        componentTypeLists.splice.apply(componentTypeLists, [componentTypeLists.length, 0].concat(extendedRootComponentTypeListCtx.accept(new RootComponentTypeListVisitor())));
                        break;
                    }
                    default: {
                        logging_1.log.warn(utils_1.getLogWithAsn1(componentTypeListsCtx, 'Not supported ASN1:'));
                        break;
                    }
                }
                break;
            }
            default: {
                logging_1.log.warn(utils_1.getLogWithAsn1(componentTypeListsCtx, 'Not supported ASN1:'));
                break;
            }
        }
        return componentTypeLists;
    };
    return ComponentTypeListsVisitor;
}());
exports.ComponentTypeListsVisitor = ComponentTypeListsVisitor;