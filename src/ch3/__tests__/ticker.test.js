const ticker = require("../ticker");

describe('ticker', () => {
    it('', async () => {
        ticker(1000, (ticks) => {
            console.log('some ticks', ticks)
        })
        .on('ticks', () => { console.log("Tick")});
    });
});