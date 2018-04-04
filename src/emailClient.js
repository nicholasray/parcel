const nodemailer = require('nodemailer');
const aws = require('aws-sdk');

class EmailClient {
  constructor(opts = {}) {
    this.transporter = opts.transporter || nodemailer.createTransport({
        SES: new aws.SES({
            apiVersion: '2010-12-01'
        })
    });
  }

  send(data) {
    // send some mail
    return this.transporter.sendMail({
        from: data.from,
        to: data.to,
        subject: data.subject,
        text: data.message
    });
  }
}

module.exports = EmailClient;
