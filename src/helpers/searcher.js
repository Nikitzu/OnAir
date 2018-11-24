import _ from 'lodash';

function searchByMatcher(matcher, xml) {
    let regexp = new RegExp(`.*${matcher}.*`);
    let foundNodes;
    foundNodes = walkTheDOM(regexp, xml, searchFunc);

    return foundNodes;
}

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

export default searchByMatcher;