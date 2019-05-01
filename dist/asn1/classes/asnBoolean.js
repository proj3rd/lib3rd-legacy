"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var base_1 = require("./base");
var AsnBoolean = /** @class */ (function (_super) {
    __extends(AsnBoolean, _super);
    function AsnBoolean() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsnBoolean.prototype.setConstraint = function () {
        return this;
    };
    AsnBoolean.prototype.expand = function () {
        return this;
    };
    AsnBoolean.prototype.toString = function (depth) {
        if (depth === void 0) { depth = 0; }
        return 'BOOLEAN';
    };
    return AsnBoolean;
}(base_1.Base));
exports.AsnBoolean = AsnBoolean;
