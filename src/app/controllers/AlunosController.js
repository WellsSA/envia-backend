import { Professor, Aluno } from '../models';
import * as Yup from 'yup';
import { validateSchema, validateId } from '../utils/validation';

const ALUNO_SCHEMA = {
  name: Yup.string().required(),
};

class AlunosControler {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      where: {
        id_escola: req.userId,
      },
      // attributes: ['id', 'name'],
    });

    return res.json(alunos);
  }

  async store(req, res) {
    await validateSchema(req.body, ALUNO_SCHEMA, res);

    const professor = await Professor.create({
      name: req.body.name,
      id_escola: req.userId,
    });

    return res.json(professor);
  }

  async update(req, res) {
    await validateId(req.params.id, res);
    await validateSchema(req.body, ALUNO_SCHEMA, res);

    const [nUpdated] = await Professor.update(
      { name: req.body.name },
      {
        where: { id: req.params.id, id_escola: req.userId },
      }
    );

    return res.json({ nUpdated });
  }

  async delete(req, res) {
    await validateId(req.params.id, res);

    const nDeleted = await Professor.destroy({
      where: { id: req.params.id, id_escola: req.userId },
    });

    return res.json({ nDeleted });
  }
}

export default new AlunosControler();
