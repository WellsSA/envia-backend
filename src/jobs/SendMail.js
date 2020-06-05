import SES from 'aws-sdk/clients/ses';

class SendMail {
  client;

  constructor() {
    this.client = new SES({
      region: 'us-east-1',
    });
  }

  async run({ to, subject, body }) {
    return this.client
      .sendEmail({
        Source: 'Startup envia <startupenvia@envia.io>',
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Subject: {
            Data: subject,
          },
          Body: {
            Text: {
              Data: body,
            },
          },
        },
        // ReplyToAddress: '',
        // ConfigurationSetName: '',
      })
      .promise();
  }
}

export default new SendMail();
