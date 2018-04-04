const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const Validator = require('./validator');
const EmailClient = require('./emailClient')
const logger = require('./logger');
const clients = require('./clients');

app.use(cors({
  origin: Object.keys(clients)
}));

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.post('/messages', bodyParser.json(), async (req, res) => {
  try {
    logger.info(`Received request from ${req.headers.origin} with data '${JSON.stringify(req.body)}'`);

    if (!(req.headers.origin in clients)) {
      logger.info(`${req.headers.origin} is not in [${Object.keys(clients)}]`);

      return res.status(400).json({
        errors: [`${req.headers.origin} is not an approved client`]
      });
    }

    let errors = Validator.validate(req.body);
    if (errors.length > 0) {
      logger.info(`Request failed validation with errors '${errors}'`);

      return res.status(400).json({
        errors
      });
    }

    let emailClient = new EmailClient();
    await emailClient.send(Object.assign(req.body, clients[req.headers.origin]));
    res.sendStatus(200);
  } catch (e) {
    logger.error(e);

    res.status(500).json({
      errors: ["Well this is embarassing. Something went wrong with that request. We have been notified and will be on it right away!"]
    });
  }
});

app.set('port', (process.env.PORT || 3000));
app.set('trust proxy', true) ;
app.listen(app.get('port'), function () {
  logger.info('Server listening on port', app.get('port'));
});
