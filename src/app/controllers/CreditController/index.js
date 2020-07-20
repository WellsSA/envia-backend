import MercadoPago from 'mercadopago';

import { CREDIT_PARAMS_SCHEMA, CREDIT_BODY_SCHEMA } from '../../utils/schemas';
import { validateSchema } from '../../utils/validation';
import { throwError } from '../../utils/error';

import { Escola } from '../../models';
import { Orders, Credits } from '../../schemas';

import { getPurchaseOrder } from './payment.util';
import CREDIT_DATA from './credit.data';

import mercadoPagoConfig from '../../../config/mercadopago';

class CreditController {
  async index(req, res) {
    if (!(await validateSchema(req.params, CREDIT_PARAMS_SCHEMA, res))) return;

    const { kind } = req.params;
    const { quantity } = req.body;

    const creditKind = CREDIT_DATA[kind];

    if (!creditKind)
      return res.status(400).json(throwError("there's not a valid kind"));

    const _credits = await Credits.findOne({ userId: req.userId });

    const credits = (_credits && _credits[creditKind.collectionKind]) || 0;

    return res.json({ credits });
  }

  async store(req, res) {
    if (!(await validateSchema(req.params, CREDIT_PARAMS_SCHEMA, res))) return;
    if (!(await validateSchema(req.body, CREDIT_BODY_SCHEMA, res))) return;

    const { kind } = req.params;
    const { quantity } = req.body;

    const creditKind = CREDIT_DATA[kind];

    if (!creditKind) throwError('Invalid credit kind');
    if (quantity < creditKind.minQuantity)
      return res
        .status(400)
        .json(throwError(`The minimum quantity is ${creditKind.minQuantity}`));

    MercadoPago.configure(mercadoPagoConfig);

    const newOrder = await Orders.create({
      userId: req.userId,
      kind: kind,
      quantity: quantity,
    });

    const purchaseOrder = getPurchaseOrder({
      id: newOrder._id, // mongo objectId
      title: `${kind} x ${quantity}`,
      quantity: quantity,
      unit_price: creditKind.unitPrice,
      payer_email: (await Escola.findByPk(req.userId)).email,
    });

    const preference = await MercadoPago.preferences.create(purchaseOrder);

    const redirect_url = preference.body.init_point;

    return res.json({ kind, quantity, redirect_url });
  }
}

export default new CreditController();
