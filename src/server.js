const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const Validator = require('./validator');
const emailClient = require('./emailClient')
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
    if (!(req.hostname in clients)) {
      return res.status(400).json({
        errors: ["Host is not an approved client"]
      });
    }

    let errors = Validator.validate(req.body);
    if (errros.length > 0) {
      return res.status(400).json({
        errors
      });
    }

    await emailClient.send(Object.assign(req.body, clients[req.hostname]));
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
