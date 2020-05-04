import { Professor } from '../models';
import * as Yup from 'yup';

const PROFESSOR_SCHEMA = {
  name: Yup.string().required(),
}

const PROFESSOR_SCHEMA_ID = {
  ...PROFESSOR_SCHEMA,
  id: Yup.number().required(),
}

const validateSchema = async (data, schema, res)  => {
  const _schema = Yup.object().shape(schema);

  if (!(await _schema.isValid(data))) {
    return res.status(400).json({ error: 'Bad request' });
  }
};
class ProfessoresControler {
  async index(req, res) {
    const professores = await Professor.findAll({
      where: {
        id_escola: req.userId,
      },
      attributes: ['id', 'name'],
    });

    return res.json(professores);
  }

  async store(req, res) {
    await validateSchema(req.body, PROFESSOR_SCHEMA, res);

    const { name } = req.body;
    const professor = await Professor.create({
      name
    });

    return res.json(professor);
  }

  async update(req, res) {
    return res.json({ ok: true });
  }

  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new ProfessoresControler();
