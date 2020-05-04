import { Curso } from '../models';
import * as Yup from 'yup';
import { validateSchema, validateId } from '../utils/validation';

const CURSO_SCHEMA = {
  name: Yup.string().required(),
};

class CursosController {
  async index(req, res) {
    const cursos = await Curso.findAll({
      where: {
        id_escola: req.userId,
      },
      attributes: ['id', 'name'],
    });

    return res.json(cursos);
  }

  async store(req, res) {
    await validateSchema(req.body, CURSO_SCHEMA, res);

    const curso = await Curso.create({
      name: req.body.name,
      id_escola: req.userId,
    });

    return res.json(curso);
  }

  async update(req, res) {
    await validateId(req.params.id, res);
    await validateSchema(req.body, CURSO_SCHEMA, res);

    const [nUpdated] = await Curso.update(
      { name: req.body.name },
      {
        where: { id: req.params.id, id_escola: req.userId },
      }
    );

    return res.json({ nUpdated });
  }

  async delete(req, res) {
    await validateId(req.params.id, res);

    const nDeleted = await Curso.destroy({
      where: { id: req.params.id, id_escola: req.userId },
    });

    return res.json({ nDeleted });
  }
}

export default new CursosController();
