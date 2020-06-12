import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { validateSchema } from '../utils/validation';
import { SIGN_IN_SCHEMA } from '../utils/schemas';
import { Escola } from '../models';

class SessionsController {
  async index(req, res) {
    if (!(await validateSchema(req.body, SIGN_IN_SCHEMA, res))) return;

    const { email, password } = req.body;

    const user = await Escola.findOne({
      where: { email },
    });

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({
        error: 'Unauthorized access. Verify your e-mail and password',
      });
    }

    return res.json({
      user: {
        name: 'Wells',
      },
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionsController();
