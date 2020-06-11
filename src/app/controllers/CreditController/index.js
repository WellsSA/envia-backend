import { CREDIT_PARAMS_SCHEMA, CREDIT_BODY_SCHEMA } from '../../utils/schemas';
import { validateSchema } from '../../utils/validation';
// import { throwError } from '../../utils/error';

class CreditController {
  async store(req, res) {
    if (!(await validateSchema(req.params, CREDIT_PARAMS_SCHEMA, res))) return;
    if (!(await validateSchema(req.body, CREDIT_BODY_SCHEMA, res))) return;

    const { quantity } = req.body;
    const { kind } = req.params;
    return res.json({ kind, quantity });
  }
}

export default new CreditController();
