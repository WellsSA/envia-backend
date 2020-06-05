import { EMAIL_SCHEMA } from '../utils/schemas';
import { validateSchema } from '../utils/validation';

class EmailsController {
  async store(req, res) {
    if (!validateSchema(req.body, EMAIL_SCHEMA, res)) return;
    return res.json({ ok: true });
  }
}

export default new EmailsController();
