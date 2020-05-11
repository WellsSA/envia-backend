import { Curso, Turma, Professor } from '../models';
import * as Yup from 'yup';
import { validateSchema, validateId } from '../utils/validation';

const USER_SCHEMA = {
  email: Yup.string().required(),
};

class UsersController {
  async index(req, res) {
    return res.json({ ok: true });
  }

  async store(req, res) {
    // criar escola
    // verificar tipo de licença
    // criar licença

    return res.json({ ok: true });
  }

  async update(req, res) {
    return res.json({ ok: true });
  }

  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new UsersController();
