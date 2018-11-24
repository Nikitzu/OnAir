export function search(obj) {

}

export function searchCities(obj) {
    let i;
    for (var k in obj) {
        i = obj[k];
        if (typeof i === 'string') {
            console.log(i);
        } else if (typeof i === 'object') {
            searchCities(i);
        }
    };
}