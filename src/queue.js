import 'dotenv/config';
import MailQueue from './queues/MailQueue';
import SendMail from './jobs/SendMail';

try {
  console.info('MAIL_SENDER: ', process.env.MAIL_SENDER);
  MailQueue.process(async job => {
    try {
      SendMail.run(job.data);
    } catch (err) {
      console.error('@Queue.js/SendMail.run: ', err);
    }
  });
  console.info('Starting [MailQueue]...');

  MailQueue.on('completed', (job, result) => {
    console.info(`Job completed with result ${JSON.stringify(result)}`);
  });
  MailQueue.on('failed', (job, err) => {
    console.info(`Job failed with err ${JSON.stringify(err)}`);
  });
} catch (err) {
  console.error('MailQueueError:', { err });
}
