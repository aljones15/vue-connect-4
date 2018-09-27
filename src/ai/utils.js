/**
 * @function flatten
 * @description simple one dimensional flattern
 * @return {Array}
 * @param {Array} l
 */
export function flatten(l) {
    return l.reduce((acc, cur) => acc.concat(cur), []);
}

/**
 * @function last
 * @param {Array} l
 * @return {Array}
 * @description returns the last element in an array
 */
export function last(l) {
    const last = l.length - 1;
    if (last <= 0) return last[0];
    return l[last];
}
