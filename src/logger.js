const winston = require('winston');

require('winston-rollbar2');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.Rollbar)({
      rollbarAccessToken: process.env.ROLLBAR_TOKEN,
      rollbarConfig: {
        environment: process.env.NODE_ENV
      },
      handleExceptions: true
    })
  ]
});

module.exports = logger;
