import SES from 'aws-sdk/clients/ses';
import { Credits } from '../app/schemas';

class UpdateCredit {
  model;

  constructor() {
    this.model = Credits;
  }

  async run({ referrer, kind, quantity }) {
    console.log(`updating credit for referrer ${referrer}...`);
    return Credits.findOneAndUpdate(
      { userId: referrer },
      { $inc: { [kind]: quantity } },
      { upsert: true }
    );
  }
}

export default new UpdateCredit();
