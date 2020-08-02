import Queue from 'bull';
import redisConfig from '../config/redis';

export const CreditQueueKey = 'credit';

class CreditQueue {
  constructor() {
    try {
      this.queue = new Queue(CreditQueueKey, {
        limiter: {
          max: 90, // FIXME: get AWS Quota
          duration: 1000,
        },
        redis: redisConfig,
      });
    } catch (err) {
      console.error('@CreditQueue/constructor. Error:', err.message);
    }
  }
}

export default new CreditQueue().queue;
