import FindRegex from "./FindRegex.js";


describe('', () => {
    it('', () => {
        const target = new FindRegex("/data \w+/");
        target.addFile('fileA.txt')
        .find()
        .on('start', (files) => {
            console.log('files we have added so far', files)
        });
    });
});