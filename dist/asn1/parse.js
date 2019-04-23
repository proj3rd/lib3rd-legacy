"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var antlr4 = require("antlr4");
var ASNLexer_1 = require("./ASNLexer");
var ASNParser_1 = require("./ASNParser");
var modules_1 = require("./visitors/modules");
/**
 * Parse ASN.1
 * @param text Text only containing ASN.1 encoded in UTF-8
 * @returns Collection of ASN.1 module definitions. Module name is key
 */
function parse(text) {
    var chars = new antlr4.InputStream(text);
    var lexer = new ASNLexer_1.ASNLexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new ASNParser_1.ASNParser(tokens);
    parser.buildParseTrees = true;
    var tree = parser.modules();
    return tree.accept(new modules_1.ModulesVisitor());
}
exports.parse = parse;
if (require.main === module) {
    var filePath = process.argv[2];
    if (!filePath) {
        throw Error('Require 1 argument, filePath');
    }
    fs_1.readFile(filePath, 'utf8', function (err, text) {
        if (err) {
            throw err;
        }
        process.stdout.write(JSON.stringify(parse(text), null, 2));
    });
}
