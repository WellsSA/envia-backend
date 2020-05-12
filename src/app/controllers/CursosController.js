import { Curso } from '../models';
import { validateSchema, validateId } from '../utils/validation';
import { CURSO_SCHEMA } from '../utils/schemas';

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
    if (!(await validateSchema(req.body, CURSO_SCHEMA, res))) return;

    const curso = await Curso.create({
      name: req.body.name,
      id_escola: req.userId,
    });

    return res.json(curso);
  }

  async update(req, res) {
    if (!(await validateId(req.params.id, res))) return;
    if (!(await validateSchema(req.body, CURSO_SCHEMA, res))) return;

    const [nUpdated] = await Curso.update(
      { name: req.body.name },
      {
        where: { id: req.params.id, id_escola: req.userId },
      }
    );

    console.info({ nUpdated });

    const updated = await Curso.findByPk(req.params.id, {
      attributes: ['id', 'name'],
    });

    return res.json(updated);
  }

  async delete(req, res) {
    if (!(await validateId(req.params.id, res))) return;

    const nDeleted = await Curso.destroy({
      where: { id: req.params.id, id_escola: req.userId },
    });

    return res.json({ nDeleted });
  }
}

export default new CursosController();
