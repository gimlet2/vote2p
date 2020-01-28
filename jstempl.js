const jstempl = function () {

    const toHtml = function (json) {
        const result = [];
        const keys = Object.keys(json);
        for (let i = 0; i < keys.length; i++) {
            const fieldName = keys[i];
            const element = document.createElement(fieldName);
            if (typeof json[fieldName] === 'string') {
                element.innerText = json[fieldName];
                result.push(element);
                continue;
            }
            if (Array.isArray(json[fieldName])) {
                for (let j = 0; j < json[fieldName].length; j++) {
                    element.appendChild(toHtml(json[fieldName][j]));
                }
                result.push(element);
                continue;
            }
            if (typeof json[fieldName] === 'object') {
                const keys2 = Object.keys(json[fieldName]);
                for (let p = 0; p < keys2.length; p++) {
                    const fieldName2 = keys2[p];
                    switch (fieldName2) {
                        case 'class' :
                            element.setAttribute('class', Array.isArray(json[fieldName][fieldName2]) ? json[fieldName][fieldName2].join(' ') : json[fieldName][fieldName2]);
                            break;
                        case 'text':
                            element.innerText = json[fieldName][fieldName2] !==
                            undefined ? json[fieldName][fieldName2] : '';
                            break;
                        case 'children':
                            if (Array.isArray(json[fieldName][fieldName2])) {
                                for (let k = 0; k < json[fieldName][fieldName2].length; k++) {
                                    element.appendChild(toHtml(json[fieldName][fieldName2][k]));
                                }
                            } else {
                                element.appendChild(toHtml(json[fieldName][fieldName2]));
                            }
                            break;
                        default:
                            if (typeof json[fieldName][fieldName2] === 'function') {
                                element.addEventListener(fieldName2, json[fieldName][fieldName2]);
                            } else {
                                element.setAttribute(fieldName2.replace(new RegExp('_', 'g'), '-'), json[fieldName][fieldName2]);
                            }
                    }
                }
            }
            result.push(element);
        }
        if (result.length === 1) {
            return result[0];
        }
        return result;
    };

    return {
        toHtml: toHtml
    }
}();