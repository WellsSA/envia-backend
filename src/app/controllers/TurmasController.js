import { Turma } from '../models';
import { validateSchema, validateId } from '../utils/validation';
import { TURMA_SCHEMA } from '../utils/schemas';
import { EXPECTED_TURMA } from '../utils/response';

class TurmasController {
  async index(req, res) {
    const turmas = await Turma.findAll({
      where: {
        id_escola: req.userId,
      },
      ...EXPECTED_TURMA,
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

    const result = await Turma.findByPk(turma.id, EXPECTED_TURMA);

    return res.json(result);
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

    const updated = await Turma.findByPk(req.params.id, EXPECTED_TURMA);

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
