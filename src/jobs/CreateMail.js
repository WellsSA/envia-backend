import MailQueue from '../queues/MailQueue';
import { MESSAGE_SCHEMA } from '../app/utils/schemas';
import { validateOnlySchema } from '../app/utils/validation';

class CreateMail {
  async run(data) {
    if (!(await validateOnlySchema(data, MESSAGE_SCHEMA))) {
      throw new Error('Invalid Message schema on CreateMail job');
    }

    console.info('Adding mail to queue...');
    return MailQueue.add(data);
  }
}

export default new CreateMail();
