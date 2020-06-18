import MailQueue from '../queues/MailQueue';
import { MESSAGE_SCHEMA } from '../app/utils/schemas';
import { validateOnlySchema } from '../app/utils/validation';

class CreateMail {
  async run(data) {
    if (!(await validateOnlySchema(data, MESSAGE_SCHEMA))) {
      throw new Error('bs/CreateMail. Error: Invalid Message schema');
    }
    try {
      console.info('Adding mail to queue...');
      const mail = await MailQueue.add(data);
      return mail;
    } catch (err) {
      console.error('@jobs/CreateMail. Error:', err);
      throw new Error(`@jobs/CreateMail. Error: ${err.message}`);
    }
  }
}

export default new CreateMail();
