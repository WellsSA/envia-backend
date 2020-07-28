import { Aluno, Responsavel } from '../models';
import { Op } from 'sequelize';

class ResponsibleControler {
  async index(req, res) {
    const students = await Aluno.findAll({
      where: {
        [Op.and]: [
          { id_escola: req.userId },
          {
            id_responsavel: {
              [Op.ne]: 1,
            },
          },
        ],
      },
      include: [
        {
          model: Responsavel,
          as: 'responsible',
          attributes: ['id', 'name', 'email'],
        },
      ],
      attributes: [],
    });

    const responsibles = students.map(
      ({ responsible: { id, name, email } }) => ({
        id,
        name,
        email,
      })
    );

    return res.json(responsibles);
  }
}

export default new ResponsibleControler();
