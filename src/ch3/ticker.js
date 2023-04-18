const EventEmitter = require("events");

const ticker = (number, callback) => {
    const eventEmitter = new EventEmitter;
    
    recursive(number, eventEmitter, 0, callback);

    return eventEmitter;
};

const recursive = (number, eventEmitter, ticks, callback) => {
    if (number <= 0) {
        return callback(ticks)
    }

    nextTick(() => emitter.emit("tick"));

    setTimeout(() => {
        eventEmitter.emit('tick')
        return recursive(number - 50, eventEmitter, ticks + 1, callback)
    }, 50);
};

module.exports = ticker;