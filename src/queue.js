import 'dotenv/config';
import './database';

import MailQueue from './queues/MailQueue';
import CreditQueue from './queues/CreditQueue';
import SendMail from './jobs/SendMail';
import RequestCreditUpdate from './jobs/RequestCreditUpdate';
import UpdateCredit from './jobs/UpdateCredit';
import { info } from './app/utils/logger';

try {
  console.info('MAIL_SENDER: ', process.env.MAIL_SENDER);

  // ############# STARTUP #############
  info('Starting b<[MailQueue]>b...');
  MailQueue.process(async job => {
    try {
      SendMail.run(job.data);
    } catch (err) {
      console.error('@Queue.js/SendMail.run: ', err);
    }
  });
  info('b<[MailQueue]>b g<started>g.');

  info('Starting b<[CreditQueue]>b...');
  CreditQueue.process(async job => {
    try {
      UpdateCredit.run(job.data);
    } catch (err) {
      console.error('@Queue.js/UpdateCredit.run: ', err);
    }
  });
  info('b<[CreditQueue]>b g<started>g.');

  // ############# LISTENERS #############
  MailQueue.on('completed', async job => {
    info(`b<@MailQueue>b: Job [${job.data.replyTo}] g<completed>g.`);
    await RequestCreditUpdate.run({
      referrer: job.data.referrer,
      kind: 'email',
      quantity: -1,
    });
  });

  MailQueue.on('failed', (job, err) => {
    info(`b<@MailQueue>b: Job r<failed>r with err ${JSON.stringify(err)}`);
    console.log({ job, err });
  });

  CreditQueue.on('completed', job => {
    info(`b<@CreditQueue>b: Job [userId: ${job.data.referrer}] g<completed>g.`);
    console.log({ job, result });
  });
  CreditQueue.on('failed', (job, err) => {
    info(`b<@CreditQueue>b: Job r<failed>r with err ${JSON.stringify(err)}`);
    console.log({ job, err });
  });
} catch (err) {
  console.error('MailQueueError:', { err });
}
