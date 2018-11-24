let reg = new RegExp('.*(Белград|Амстердам|Кишинев|Будапешт|Афины|Мурманск).*')
let result = {
    images: [],
    articles:[],
}

export function searchCities(obj) {
    let i;
    for (var k in obj) {
        if (k !== 'parent') {
            i = obj[k];
            if (typeof i === 'string' && i.search(reg) !== -1) {
                result.articles.push(i);
                result.images.push(searchPictures(obj.parent));
            } else if (typeof i === 'object') {
                i.parent = obj;
                searchCities(i);
            }
        }
    };
    return result;
}

export function searchPictures(obj) {
    let pictureUrl;
    let ImageDataKeys = Object.keys(obj)
        .map((i) => obj[i].name === 'ImageData' ? i : null)
        .filter((i) => i);
    if (ImageDataKeys.length) {
        pictureUrl = obj[ImageDataKeys[0]].attributes.src;
    } else {
        pictureUrl = searchPictures(obj.parent);
    }
    return pictureUrl;
}