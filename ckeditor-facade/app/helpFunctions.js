var getTranslate = function (label, lang, defaultVal) {
    if (typeof defaultVal === "undefined") {
        defaultVal = 'Custom';
    }

    var newLabel = defaultVal;

    if (typeof label === "object") {
        if (typeof label[lang] !== "undefined") {
            newLabel = label[lang];
        } else if (typeof label['en'] !== "undefined") {
            newLabel = label['en'];
        } else if (typeof label[0] !== "undefined") {
            newLabel = label[0];
        }
    }

    return newLabel;
}

var getTranslateElements = function (elements, lang, defaultVal) {
    if (typeof elements === "object") {
        elements.forEach(function (el, i) {
            if (typeof el.label !== "undefined") {
                el.label = getTranslate(el.label, lang, defaultVal);
            }

            if (typeof el.elements === "object") {
                el.elements = getTranslateElements(el.elements, lang, defaultVal);
            }

            if (typeof el.children === "object") {
                el.elements = getTranslateElements(el.children, lang, defaultVal);
            }
        });
    }
    return elements;
}

String.prototype.upperFirst = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}