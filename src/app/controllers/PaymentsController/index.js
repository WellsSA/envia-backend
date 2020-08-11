import { validateSchema } from '../../utils/validation';

import log from 'log-to-file';
import axios from 'axios';
import {
  PAYMENT_QUERY_SCHEMA,
  PAYMENT_API_RESPONSE_SCHEMA,
} from '../../utils/schemas';

import { Orders } from '../../schemas';

import creditHandler from './credit.payment';
import licenseHandler from './license.payment';

const PAYMENT_STATUS = {
  APPROVED: 'approved',
};

const KIND_HANDLER = {
  email: creditHandler,
  sms: creditHandler,
  license: licenseHandler,
};

class PaymentsController {
  async store(req, res) {
    const NOTIFY_API_URL = process.env.MERCADO_PAGO_PAYMENT_NOTIFY_URL;
    const ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    // 1. Validate notification data using 'PAYMENT_QUERY_SCHEMA' schema
    if (!(await validateSchema(req.query, PAYMENT_QUERY_SCHEMA, res))) return;
    const { 'data.id': paymentId } = req.query;

    // 2. Call Mercado Pago API using 'data.id' property
    const { data } = await axios.get(`${NOTIFY_API_URL}/${paymentId}`, {
      params: {
        access_token: ACCESS_TOKEN,
      },
    });

    // 3. Validate Mercado Pago API's response using 'PAYMENT_API_RESPONSE_SCHEMA' schema
    if (!(await validateSchema(data, PAYMENT_API_RESPONSE_SCHEMA, res))) return;
    const { external_reference, status } = data;

    // 4. Verify payment state checking for 'approved' status
    switch (status) {
      case PAYMENT_STATUS.APPROVED:
        // 5. get order information using mongo objectID on 'external_reference' field
        const { userId, kind, quantity } = await Orders.findByIdAndUpdate(
          external_reference,
          {
            status: PAYMENT_STATUS.APPROVED,
          }
        );

        const handler = KIND_HANDLER[kind];

        if (!handler) log(`Not found ${kind}`);

        // 6. Add credit based on what user purchased
        await handler(userId, kind, quantity);

        break;
      default:
        break;
    }

    log(
      `\n+++++++ new request +++++++++
       \ndata: ${JSON.stringify(req.query)}
       \n+++++++++++++++++`,
      'notify.log'
    );

    return res.json({ success: true });
  }
}

export default new PaymentsController();
