import MercadoPago from 'mercadopago';

import { CREDIT_PARAMS_SCHEMA, CREDIT_BODY_SCHEMA } from '../../utils/schemas';
import { validateSchema } from '../../utils/validation';
import { throwError } from '../../utils/error';

import { getPurchaseOrder } from './payment.util';
import creditData from './credit.data';
import mercadoPagoConfig from '../../../config/mercadopago';
class CreditController {
  async store(req, res) {
    if (!(await validateSchema(req.params, CREDIT_PARAMS_SCHEMA, res))) return;
    if (!(await validateSchema(req.body, CREDIT_BODY_SCHEMA, res))) return;

    const { kind } = req.params;
    const { quantity } = req.body;

    const creditKind = creditData[kind];

    if (!creditKind) throwError('Invalid credit kind');
    if (quantity < creditKind.minQuantity)
      throwError(`The minimum quantity is ${creditKind.minQuantity}`);

    MercadoPago.configure(mercadoPagoConfig);

    const purchaseOrder = getPurchaseOrder({
      id: '123', // mongo objectId
      title: 'E-mail x 22', // creditKind X Quantity
      quantity: 40, // request quantity
      unit_price: 0.05, // creditData unit_price
      payer_email: 'wel@wel.com', // SQL email based on req.userId
    });

    const preference = await MercadoPago.preferences.create(purchaseOrder);

    const redirect_url = preference.body.init_point;

    return res.json({ kind, quantity, redirect_url });
  }
}

export default new CreditController();
