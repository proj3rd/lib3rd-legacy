"use strict";
exports.__esModule = true;
var $ = require("cheerio");
var fs_1 = require("fs");
var headerTitles = [
    'ie/group name',
    'presence',
    'range',
    'ie type and reference',
    'semantics description',
    'criticality',
    'assigned criticiality',
];
var reDepth = /^>+/;
function parse(html) {
    var _a;
    var sectionNumber = null;
    var sectionTitle = null;
    var direction = null;
    var stack = selectorToArray($(html)).reverse();
    while (stack.length) {
        var selector = stack.pop();
        var elem = selector[0];
        //  TODO
        if (isTagHeading(elem)) {
            (_a = sectionInformation(selector), sectionNumber = _a.sectionNumber, sectionTitle = _a.sectionTitle);
            direction = null;
            continue;
        }
        if (containsDirection(selector)) {
            direction = getDirection(selector);
            continue;
        }
        if (isMsgIeTable(selector)) {
            var msgIeDefinition = parseTable(selector);
            continue;
        }
        stack = stackChildren(stack, selector);
    }
}
exports.parse = parse;
function isTag(elem) {
    return elem.type === 'tag';
}
function isTagHeading(elem) {
    return isTag(elem) && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(elem.name) !== -1;
}
function sectionInformation(selector) {
    var sectionHeading = normalizeWhitespace(selector.text());
    var indexDelimiter = sectionHeading.indexOf(' ');
    var sectionNumber = sectionHeading.substring(0, indexDelimiter);
    var sectionTitle = sectionHeading.substring(indexDelimiter + 1);
    return { sectionNumber: sectionNumber, sectionTitle: sectionTitle };
}
function containsDirection(selector) {
    return normalizeWhitespace(selector.text()).startsWith('Direction:');
}
function getDirection(selector) {
    // MS Word converts rightwards arrow to \u00AE (REGISTERED SIGN)
    return normalizeWhitespace(selector.text()).replace(/®/g, '→');
}
function isMsgIeTable(selector) {
    var elem = selector[0];
    if (!isTag(elem) || elem.name !== 'table') {
        return false;
    }
    var headerTds = selector.find('tr').first().children('td').slice(0, 5);
    return headerTds.get().reduce(function (prev, curr, currIndex, arr) {
        return prev && (normalizeWhitespace($(curr).text()).toLowerCase() === headerTitles[currIndex]);
    }, true);
}
function parseTable(selector) {
    var trs = selector.find('tr').slice(1);
    var msgIeDefinition = trs.map(function (indexTr, tr) {
        var msgIeDefinitionElem = {
            'ie/group name': null,
            'presence': null,
            'range': null,
            'ie type and reference': null,
            'semantics description': null,
            'depth': null
        };
        $(tr).find('td').each(function (indexTd, td) {
            var key = headerTitles[indexTd];
            msgIeDefinitionElem[key] = normalizeWhitespace($(htmlToText($(td).html())).text());
        });
        msgIeDefinitionElem.depth = elemDepth(msgIeDefinitionElem);
        return msgIeDefinitionElem;
    }).get();
    return msgIeDefinition;
}
function selectorToArray(selector) {
    return selector.map(function (index, elem) {
        return $(elem);
    }).get();
}
function stackChildren(stack, selector) {
    var children = selector.children().map(function (index, child) {
        return $(child);
    }).get();
    return stack.concat(children.reverse());
}
function normalizeWhitespace(text) {
    return text.trim().replace(/\s+/g, ' ');
}
function htmlToText(html) {
    return html.replace(/<sup>\s*?(.+?)\s*?<\/sup>/g, '^($1)')
        .replace(/<sub>\s*?(.+?)\s*?<\/sub>/g, '_($1)');
}
function elemDepth(msgIeDefinitionElem) {
    var matchDepth = msgIeDefinitionElem['ie/group name'].match(reDepth);
    if (matchDepth) {
        return matchDepth[0].length;
    }
    return 0;
}
if (require.main === module) {
    var filePath = process.argv[2];
    if (!filePath) {
        throw Error('Requires 1 argument, filePath');
    }
    fs_1.readFile(filePath, 'utf8', function (err, html) {
        if (err) {
            throw err;
        }
        process.stdout.write(JSON.stringify(parse(html), null, 2));
    });
}