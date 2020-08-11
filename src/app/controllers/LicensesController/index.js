import { Escola } from '../../models';
import { throwError } from '../../utils/error';
import { LICENSE_REQUEST_SCHEMA } from '../../utils/schemas';
import { validateSchema } from '../../utils/validation';

import OrdersManager from '../../vendor/OrdersManager';
import LICENSES from './licenses.data';

class LicensesController {
  async store(req, res) {
    if (!(await validateSchema(req.body, LICENSE_REQUEST_SCHEMA, res))) return;
    const { email, kind } = req.body;

    const license = LICENSES[kind];

    if (!license)
      return res.status(400).json(throwError('invalid license kind'));

    const user = await Escola.findOne({ where: { email } });

    if (!user) return res.status(400).json(throwError('user not found'));

    const newOrder = await OrdersManager.storeOrder({
      userId: user.id,
      kind: 'license',
      quantity: license.vigency,
      status: 'pending',
    });

    const purchaseOrder = OrdersManager.preparePurchaseOrder({
      id: newOrder._id,
      title: `Licença ${license.label} - ENVIA`,
      quantity: 1,
      unit_price: license.value,
      payer_email: email,
    });

    const preference = await OrdersManager.createPurchaseOrder(purchaseOrder);

    const redirect_url = preference.body.init_point;

    return res.json({ success: true, redirect_url });
  }

  async update(req, res) {
    return res.json({ success: true, ...req.body });
  }
}

export default new LicensesController();
