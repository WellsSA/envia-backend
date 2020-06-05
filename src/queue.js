import 'dotenv/config';
import MailQueue from './queues/MailQueue';
import SendMail from './jobs/SendMail';

try {
  MailQueue.process(async job => await SendMail.run(job.data));
} catch (err) {
  console.log('MailQueueError:', { err });
}
