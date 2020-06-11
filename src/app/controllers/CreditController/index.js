import MercadoPago from 'mercadopago';

import { CREDIT_PARAMS_SCHEMA, CREDIT_BODY_SCHEMA } from '../../utils/schemas';
import { validateSchema } from '../../utils/validation';
// import { throwError } from '../../utils/error';

import { getPurchaseOrder } from './payment.util';
class CreditController {
  async store(req, res) {
    if (!(await validateSchema(req.params, CREDIT_PARAMS_SCHEMA, res))) return;
    if (!(await validateSchema(req.body, CREDIT_BODY_SCHEMA, res))) return;

    const { quantity } = req.body;
    const { kind } = req.params;

    MercadoPago.configure({
      sandbox: process.env.MERCADO_PAGO_SANDBOX ? true : false,
      access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    });

    const purchaseOrder = getPurchaseOrder(req);

    console.log(purchaseOrder);

    const preference = await MercadoPago.preferences.create(purchaseOrder);

    const redirect_url = preference.body.init_point;

    return res.json({ kind, quantity, redirect_url });
  }
}

export default new CreditController();
