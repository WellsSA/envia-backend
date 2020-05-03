import { Professor } from '../models';

class ProfessoresControler {
  async index(req, res) {
    const professores = await Professor.findAll({
      where: {
        id_escola: req.userId,
      },
      attributes: ['id', 'name'],
    });
    // console.log(test);

    return res.json(professores);
  }

  async store(req, res) {
    return res.json({ ok: true });
  }

  async update(req, res) {
    return res.json({ ok: true });
  }

  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new ProfessoresControler();
