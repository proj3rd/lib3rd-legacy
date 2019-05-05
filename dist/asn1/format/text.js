"use strict";
exports.__esModule = true;
var logging_1 = require("../../utils/logging");
/**
 * Format ASN.1 in text
 * @param msgIes Collection of ASN.1 objects you want to format
 * @returns ASN.1 notation in string
 */
function format(msgIes) {
    var formattedStrings = [];
    msgIes.forEach(function (msgIe) {
        logging_1.log.debug("Formatting " + msgIe.name + " in text...");
        formattedStrings.push(msgIe.name + " ::= " + msgIe.definition.toString());
    });
    return formattedStrings.join('\n\n');
}
exports.format = format;