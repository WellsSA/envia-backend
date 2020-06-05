import MailQueue from '../queues/MailQueue';

class CreateMail {
  async run(data) {
    console.log('Adding mail to queue...');
    return MailQueue.add(data);
  }
}

export default new CreateMail();
