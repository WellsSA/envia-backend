import { Escola, Licenca } from '../models';
import { validateSchema } from '../utils/validation';
import { USER_SCHEMA } from '../utils/schemas';
import { throwError } from '../utils/error';
import { addDays } from 'date-fns';

class UsersController {
  async index(req, res) {
    const escola = await Escola.findByPk(req.userId, {
      attributes: ['name', 'email'],
      include: [
        {
          model: Licenca,
          as: 'licence',
        },
      ],
    });

    return res.json(escola);
  }

  async store(req, res) {
    if (!(await validateSchema(req.body, USER_SCHEMA, res))) return;

    const { name, email, password } = req.body;

    const alreadyExists = await Escola.findOne({ where: { email } });

    if (alreadyExists)
      return res.status(400).json(throwError('e-mail already in use'));

    const user = await Escola.create({ name, email, password });

    const today = new Date();

    const licence = await Licenca.create({
      licence: Math.random().toString(36).substr(2, 8).toUpperCase(),
      start: today.toISOString(),
      end: addDays(today, 7),
      type: 'ENVIA_TRIAL',
      user_id: user.id,
      history: '7d',
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
    if (!(await validateSchema(req.body, USER_SCHEMA, res))) return;

    const { name, email, password, newPassword } = req.body;

    const user = await Escola.findByPk(req.userId);

    if (!user || !(await user.checkPassword(password))) {
      return res
        .status(401)
        .json(throwError('unauthorized access. your password does not match'));
    }

    const passwordObj = newPassword
      ? { password_hash: await user.hashPassword(newPassword) }
      : {};

    const [nUpdated] = await Escola.update(
      { name, email, ...passwordObj },
      {
        where: { id: req.userId },
      }
    );

    console.info({ nUpdated });

    return res.json({ name, email });
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
      return res.status(500).json(throwError('failed on delete user'));

    return res.json({ success: true });
  }

  async image(req, res) {
    console.log({ file: req.file });
    res.json({ ok: true });
  }
}

export default new UsersController();
