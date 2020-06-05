import 'dotenv/config';
import MailQueue from './queues/MailQueue';
import SendMail from './jobs/SendMail';

try {
  MailQueue.process(async job => SendMail.run(job.data));
  console.info('Starting [MailQueue]...');

  MailQueue.on('completed', (job, result) => {
    console.log(`Job completed with result ${JSON.stringify(result)}`);
  });
  MailQueue.on('failed', (job, err) => {
    console.log(`Job failed with err ${JSON.stringify(err)}`);
  });
} catch (err) {
  console.error('MailQueueError:', { err });
}
