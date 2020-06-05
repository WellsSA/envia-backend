import SES from 'aws-sdk/clients/ses';

class SendMail {
  client;

  constructor() {
    this.client = new SES({
      region: 'us-east-1',
    });
  }

  async run({ from, to, subject, text, replyTo }) {
    console.log('sending mail...');
    return this.client
      .sendEmail({
        Source: from,
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Subject: {
            Data: subject,
          },
          Body: {
            Text: {
              Data: text,
            },
          },
        },
        ReplyToAddresses: [replyTo],
        // ConfigurationSetName: '',
      })
      .promise();
  }
}

export default new SendMail();
