import { Professor } from '../models';
import { validateSchema, validateId } from '../utils/validation';
import { PROFESSOR_SCHEMA } from '../utils/schemas';

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
    if (!(await validateSchema(req.body, PROFESSOR_SCHEMA, res))) return;

    const professor = await Professor.create({
      name: req.body.name,
      id_escola: req.userId,
    });

    return res.json(professor);
  }

  async update(req, res) {
    if (!(await validateId(req.params.id, res))) return;
    if (!(await validateSchema(req.body, PROFESSOR_SCHEMA, res))) return;

    const [nUpdated] = await Professor.update(
      { name: req.body.name },
      {
        where: { id: req.params.id, id_escola: req.userId },
      }
    );

    console.info({ nUpdated });

    const updated = await Professor.findByPk(req.params.id, {
      attributes: ['id', 'name'],
    });

    return res.json(updated);
  }

  async delete(req, res) {
    if (!(await validateId(req.params.id, res))) return;

    const nDeleted = await Professor.destroy({
      where: { id: req.params.id, id_escola: req.userId },
    });

    return res.json({ nDeleted });
  }
}

export default new ProfessoresControler();
