import Queue from 'bull';
import redisConfig from '../config/redis';

export const MailQueueKey = 'mail';

class MailQueue {
  constructor() {
    try {
      this.queue = new Queue(MailQueueKey, {
        limiter: {
          max: 90, // FIXME: get AWS Quota
          duration: 1000,
        },
        redis: redisConfig,
      });
    } catch (err) {
      console.error('@MailQueue/constructor. Error:', err.message);
    }
  }
}

export default new MailQueue().queue;
