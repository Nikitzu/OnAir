import _ from 'lodash';

let reg = new RegExp('.*(белград|венеция|рига|будапешт|афины|доминикана).*')

const result = {
    'белград': {
        images: [],
        articles:[],
    },
    'венеция': {
        images: [],
        articles:[],
    },
    'рига': {
        images: [],
        articles:[],
    },
    'будапешт': {
        images: [],
        articles:[],
    },
    'афины': {
        images: [],
        articles:[],
    },
    'доминикана': {
        images: [],
        articles:[],
    },
};

export function searchCities2(obj) {
    let res = obj.value.toLowerCase().match(reg);
    if (res) {
        res[1] = res[1].toLowerCase();
        //res[1][0] = res[1][0].toUpperCase();

        result[res[1]].articles.push(res[0]);
        
        result[res[1]].images.push('./' + searchImage(obj.parent || obj));

    } else if (obj.children.length) {
        obj.children.forEach((child) => {
            child.parent = obj;
            searchCities2(child);
        });
    }

    return result;
}

function searchImage(obj, foundImage = "") {
    if (obj.children.length) {
        obj.children.forEach((child) => {
            if (child.name === 'ImageData' && child.attributes.src) {
                foundImage = child.attributes.src
            } else if (child.name === 'Figure') {
                foundImage = searchImage(child);
            }
        });
    }
    return foundImage;
}

// export function searchCities(obj) {
//     let i;
//     for (var k in obj) {
//         if (k !== 'parent') {
//             i = obj[k];
//             if (typeof i === 'string' && i.search(reg) !== -1) {
//                 result.articles.push(i);
//                 result.images.push(searchPictures(obj.parent));
//             } else if (typeof i === 'object') {
//                 i.parent = obj;
//                 searchCities(i);
//             }
//         }
//     };
//     return result;
// }

export function searchByMatcher(matcher, xml) {
    let regexp = new RegExp(`.*${matcher}.*`);
    let foundNodes;
    foundNodes = walkTheDOM(regexp, xml, searchFunc);

    return foundNodes;
}

// function searchPictures(obj) {
//     let pictureUrl;
//     let ImageDataKeys = Object.keys(obj)
//         .map((i) => obj[i].name === 'ImageData' ? i : null )
//         .filter((i) => i);

//     if (ImageDataKeys.length) {
//         pictureUrl = obj[ImageDataKeys[0]].attributes.src;
//     } else {
//         pictureUrl = searchPictures(obj.parent);
//     }
//     return pictureUrl;
// }

function walkTheDOM(matcher, node, seachFunc, foundNodes = []) {
    foundNodes = seachFunc(matcher, node, foundNodes);

    _.forEach(node.children, (child) => {
        foundNodes = walkTheDOM(matcher, child, seachFunc, foundNodes);
    });

    return foundNodes;
}


function searchFunc(matcher, node, foundNodes) {
    if (node.value.search(matcher) !== -1) {
        foundNodes.push(node.value);
    }

    return foundNodes;
}