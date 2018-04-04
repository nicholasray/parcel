let nodemailer = require('nodemailer');
let aws = require('aws-sdk');

class EmailClient {
  constructor(opts = {}) {
    let transporter = opts.transporter || nodemailer.createTransport({
        SES: new aws.SES({
            apiVersion: '2010-12-01'
        })
    });
  }

  send(data) {
    // send some mail
    return transporter.sendMail({
        from: data.from,
        to: data.to,
        subject: data.subject,
        text: data.message
    });
  }
}

module.exports = EmailClient;
