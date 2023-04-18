const FindRegex = require("../FindRegex.js");

describe('FindRegex', () => {
    it('test start invokes async', () => {
        const target = new FindRegex("/data \w+/");
        target
            .addFile('fileA.txt')
            .find()
            .once('start', (files) => {
                console.log('this will error but get invoked.')
            });
    });
});