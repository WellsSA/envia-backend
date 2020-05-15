import { Curso, Turma, Professor } from '../models';
import { validateSchema, validateId } from '../utils/validation';
import { TURMA_SCHEMA } from '../utils/schemas';

class TurmasController {
  async index(req, res) {
    const turmas = await Turma.findAll({
      where: {
        id_escola: req.userId,
      },
      attributes: ['id', 'name', 'days', 'hours'],
      include: [
        {
          model: Curso,
          as: 'course',
          attributes: ['id', 'name'],
        },
        {
          model: Professor,
          as: 'teacher',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(turmas);
  }

  async store(req, res) {
    if (!(await validateSchema(req.body, TURMA_SCHEMA, res))) return;

    const { name, days, hours, course, teacher } = req.body;

    const turma = await Turma.create({
      name,
      days,
      hours,
      id_curso: course.id,
      id_professor: teacher.id,
      id_escola: req.userId,
    });

    return res.json(turma);
  }

  async update(req, res) {
    if (!(await validateId(req.params.id, res))) return;
    if (!(await validateSchema(req.body, TURMA_SCHEMA, res))) return;

    const { name, days, hours, course, teacher } = req.body;

    const [nUpdated] = await Turma.update(
      {
        name,
        days,
        hours,
        id_curso: course.id,
        id_professor: teacher.id,
      },
      {
        where: { id: req.params.id, id_escola: req.userId },
      }
    );

    console.info({ nUpdated });

    const updated = await Turma.findByPk(req.params.id, {
      attributes: ['id', 'name', 'days', 'hours'],
      include: [
        {
          model: Curso,
          as: 'course',
          attributes: ['id', 'name'],
        },
        {
          model: Professor,
          as: 'teacher',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(updated);
  }

  async delete(req, res) {
    if (!(await validateId(req.params.id, res))) return;

    const nDeleted = await Turma.destroy({
      where: { id: req.params.id, id_escola: req.userId },
    });

    return res.json({ nDeleted });
  }
}

export default new TurmasController();
