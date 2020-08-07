import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import CreateMail from '../../jobs/CreateMail';
import { Escola } from '../models';
import { throwError } from '../utils/error';
import {
  CHANGE_FORGOT_PASSWORD_SCHEMA,
  FORGOT_PASSWORD_SCHEMA,
} from '../utils/schemas';
import { validateSchema } from '../utils/validation';
import { prepareFullName } from '../utils/mail';

const FORGOT_SECRET = authConfig.secret + 'eadkljsia#4F0';

class ForgotPasswordsController {
  async store(req, res) {
    // 1. Validate request email
    if (!(await validateSchema(req.body, FORGOT_PASSWORD_SCHEMA, res))) return;
    const { email } = req.body;

    // 2. get user information
    const user = await Escola.findOne({ where: { email } });
    if (!user) return res.status(400).json(throwError('user not found'));

    // 3. Generate token (modified secret)
    const auth = jwt.sign({ id: user.id }, FORGOT_SECRET, { expiresIn: '1d' });
    const url = `${process.env.APP_URL}/forgot?auth=${auth}`;

    const title = prepareFullName(
      '[NOME] | ENVIA | Recuperação de senha',
      user.name
    );

    const message = prepareFullName(
      `Olá [NOME],
      \nvimos que solicitou uma alteração de senha.
      \nClique aqui para gerar uma nova senha: ${url}.
      \nSe não foi você, desconsidere este e-mail.
      \nAt.te, Envia Corp
      `,
      user.name
    );
    // 4. Send recuperation mail with token and url
    await CreateMail.run({
      from: `Envia Corp <${process.env.MAIL_SENDER}>`,
      to: `${user.name} <${user.email}>`,
      subject: title,
      text: message,
      referrer: -1,
    });

    return res.json({ success: true });
  }

  async update(req, res) {
    // 1. validate token
    if (!(await validateSchema(req.body, CHANGE_FORGOT_PASSWORD_SCHEMA, res)))
      return;
    try {
      const { auth, password } = req.body;

      // 2. extract token information
      const decoded = await promisify(jwt.verify)(auth, FORGOT_SECRET);

      // 4. change user's password
      const user = await Escola.findByPk(decoded.id);
      await Escola.update(
        { password_hash: await user.hashPassword(password) },
        {
          where: { id: user.id },
        }
      );
    } catch (err) {
      if (err.message === 'invalid signature')
        return res.status(401).json(throwError('invalid auth'));
      throw Error(err);
    }

    return res.json({ success: true });
  }
}

export default new ForgotPasswordsController();
