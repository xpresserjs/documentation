const container = require('markdown-it-container');

module.exports = (md) => {
    md.use(container, 'xTabs', {
        render: (tokens, idx) => {
            const token = tokens[idx];
            const attr = getSlotName(token.info);

            if (token.nesting === 1) {
                return `\n<TabbedView tabs="${attr}">\n`;
            } else {
                return `\n</TabbedView>\n`;
            }
        },
    });

    md.use(container, 'xTab', {
        render: (tokens, idx) => {
            const token = tokens[idx];
            const slotName = getSlotName(token.info);

            if (token.nesting === 1) {
                return `<template ${slotName}>\n`;
            } else {
                return `</template>\n`;
            }
        },
    });
};

function getSlotName(info) {
    info = info.trim();
    let [tab, ...type] = info.split(' ');
    type = type.join(' ')


    if (tab === 'xTab' && type) {
        type = slugify(type);
        return `v-slot:${type}`
    } else if (tab === 'xTabs' && type) {
        return type
    }

    return ""
}

function slugify(str, separator = "-") {
    return str
        .toString()
        .normalize('NFD')                   // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, separator);
};