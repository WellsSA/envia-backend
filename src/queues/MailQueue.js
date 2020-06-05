import Queue from 'bull';
import redisConfig from '../config/redis';

export const MailQueueKey = 'mail';

const MailQueue = new Queue(MailQueueKey, {
  limiter: {
    max: 90, // FIXME: get AWS Quota
    duration: 1000,
  },
  redis: redisConfig,
});

export default MailQueue;
