import CreditQueue from '../queues/CreditQueue';
import { CREDIT_JOB_SCHEMA } from '../app/utils/schemas';
import { validateOnlySchema } from '../app/utils/validation';
import { info } from '../app/utils/logger';

class RequestCreditUpdate {
  async run(data) {
    if (!(await validateOnlySchema(data, CREDIT_JOB_SCHEMA))) {
      throw new Error(
        'jobs/RequestCreditUpdate. Error: Invalid Message schema'
      );
    }
    try {
      info(
        'b<@CreditQueue>b: y<attempting to add>y credit request to queue...'
      );
      console.info('Adding credit request to queue...');
      const creditRequest = await CreditQueue.add(data);
      info('b<@CreditQueue>b: credit request added with g<success>g!');
      return creditRequest;
    } catch (err) {
      console.error('@jobs/RequestCreditUpdate. Error:', err);
      throw new Error(`@jobs/RequestCreditUpdate. Error: ${err.message}`);
    }
  }
}

export default new RequestCreditUpdate();
