
function undent(strings) {
    return strings.map((string) => {
        string = string.replace(/^\n+/g, '');
        const indent = string.search(/\S/);
        return string
            .split('\n')
            .map((line) => {
                return line.slice(indent).trimEnd();
            })
            .join('\n').trimEnd();
    }).join('\n');
}
module.exports = undent;
