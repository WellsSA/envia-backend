import MailQueue from '../queues/MailQueue';
import { MESSAGE_SCHEMA } from '../app/utils/schemas';
import { validateOnlySchema } from '../app/utils/validation';
import { info } from '../app/utils/logger';

class CreateMail {
  async run(data) {
    if (!(await validateOnlySchema(data, MESSAGE_SCHEMA))) {
      throw new Error('jobs/CreateMail. Error: Invalid Message schema');
    }
    try {
      info('b<@MailQueue>b: y<attempting to add>y mail to queue...');
      const mail = await MailQueue.add(data);
      info('b<@MailQueue>b: mail added with g<success>g!');
      return mail;
    } catch (err) {
      console.error('@jobs/CreateMail. Error:', err);
      throw new Error(`@jobs/CreateMail. Error: ${err.message}`);
    }
  }
}

export default new CreateMail();
