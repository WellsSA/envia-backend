import { Professor, Aluno, Responsavel } from '../models';
import * as Yup from 'yup';
import { validateSchema, validateId } from '../utils/validation';

const ALUNO_SCHEMA = {
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.number(),
  birthDate: Yup.string().required(),
};

const RESPONSAVEL_SCHEMA = {
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.number(),
};

/*
index:
 - aluno OK
 - responsavel OK
 - turma

store:
 - aluno OK
 - responsavel OK
 - turma

 update:
 - aluno
 - responsavel
 - turma

delete:
 - aluno OK
 - responsavel OK
*/
class AlunosControler {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      where: {
        id_escola: req.userId,
      },
      attributes: ['id', 'name', 'email', 'phone', 'birthDate'],
      include: [
        {
          model: Responsavel,
          as: 'responsible',
          attributes: ['id', 'name', 'email', 'phone'],
        },
      ],
    });

    return res.json(alunos);
  }

  async store(req, res) {
    if (!(await validateSchema(req.body, ALUNO_SCHEMA, res))) return;

    const { responsible } = req.body;

    let responsavel = { id: 1 };

    if (responsible) {
      if (!(await validateSchema(responsible, RESPONSAVEL_SCHEMA, res))) return;

      responsavel = await Responsavel.create({
        ...responsible,
      });
    }

    const { name, email, phone, birthDate } = req.body;

    const aluno = await Aluno.create({
      name,
      email,
      phone,
      birthDate,
      id_responsavel: responsavel.id,
      id_escola: req.userId,
    });

    // TODO: turmas
    return res.json(aluno);
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
    const { id } = req.params;

    if (!(await validateId(id, res))) return;

    const nDeleted = {
      alunos: 0,
      responsaveis: 0,
    };

    const { id_responsavel: responsibleId } = await Aluno.findOne({
      where: { id, id_escola: req.userId },
    });

    if (responsibleId !== 1) {
      nDeleted.responsaveis = await Responsavel.destroy({
        where: { id: responsibleId },
      });
    }

    nDeleted.alunos = await Aluno.destroy({
      where: { id: req.params.id, id_escola: req.userId },
    });

    return res.json({ nDeleted });
  }
}

export default new AlunosControler();
