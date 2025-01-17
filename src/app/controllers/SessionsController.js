import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { validateSchema } from '../utils/validation';
import { SIGN_IN_SCHEMA } from '../utils/schemas';
import { Escola, Licenca } from '../models';
import { throwError } from '../utils/error';

class SessionsController {
  async index(req, res) {
    if (!(await validateSchema(req.body, SIGN_IN_SCHEMA, res))) return;

    const { email, password } = req.body;

    const user = await Escola.findOne({
      where: { email },
      include: [{ model: Licenca, as: 'licence' }],
    });

    if (!user || !(await user.checkPassword(password))) {
      return res
        .status(401)
        .json(
          throwError('unauthorized access. verify your e-mail and password')
        );
    }

    return res.json({
      user: {
        name: user.name,
        email: user.email,
        firstAccess: user.firstAccess,
        licence: user.licence,
      },
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async store(req, res) {
    await Escola.update(
      {
        firstAccess: false,
      },
      {
        where: { id: req.userId },
      }
    );

    return res.json({ success: true });
  }
}

export default new SessionsController();
