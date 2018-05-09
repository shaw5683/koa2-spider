const juejinSpider = require('./juejinSpider');

const func = (times, timeout) => {
    juejinSpider(times, timeout);
    setTimeout(() => {
        func(5, timeout);
    }, timeout);
}

module.exports = {
    runJuejinSpider (times, timeout) {
        func(times, timeout);
    }
}