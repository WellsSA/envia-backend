import { Escola, Licenca } from '../models';
import { validateSchema } from '../utils/validation';
import { USER_SCHEMA } from '../utils/schemas';
import { throwError } from '../utils/error';
import { addDays } from 'date-fns';

class UsersController {
  async store(req, res) {
    if (!(await validateSchema(req.body, USER_SCHEMA, res))) return;

    const { name, email, password } = req.body;

    const alreadyExists = await Escola.findOne({ where: { email } });

    if (alreadyExists)
      return res.status(400).json(throwError('This e-mail is already in use'));

    const user = await Escola.create({ name, email, password });

    const today = new Date();

    const licence = await Licenca.create({
      licence: Math.random().toString(36).substr(2, 8).toUpperCase(),
      start: today.toISOString(),
      end: addDays(today, 7),
      type: 'ENVIA_TRIAL',
      user_id: user.id,
    });

    await Escola.update(
      {
        id_licenca: licence.id,
      },
      {
        where: { id: user.id },
      }
    );

    return res.json({ success: true });
  }

  async update(req, res) {
    return res.status(501).json(throwError('not implemented yet'));
  }

  async delete(req, res) {
    const [nUpdated] = await Escola.update(
      {
        active: false,
      },
      {
        where: { id: req.userId },
      }
    );

    if (!nUpdated)
      return res.status(500).json(throwError('Failed on delete user'));

    return res.json({ success: true });
  }
}

export default new UsersController();
