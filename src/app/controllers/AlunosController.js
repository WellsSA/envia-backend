import { Professor, Aluno, Responsavel, Turma } from '../models';
import * as Yup from 'yup';
import { validateSchema, validateId } from '../utils/validation';
const ALUNO_SCHEMA = {
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.number(),
  birthDate: Yup.string().required(),
  turmas: Yup.array().of(Yup.number()),
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
 - turma OK

store:
 - aluno OK
 - responsavel OK
 - turma_aluno OK

 update:
 - aluno OK
 - responsavel OK
 - turma_aluno OK

delete:
 - aluno OK
 - responsavel OK
 - turma_aluno OK
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
        {
          model: Turma,
          as: 'turmas',
          attributes: ['id', 'name'],
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

    const { name, email, phone, birthDate, turmas } = req.body;

    const aluno = await Aluno.create({
      name,
      email,
      phone,
      birthDate,
      id_responsavel: responsavel.id,
      id_escola: req.userId,
    });

    if (turmas && turmas.length) {
      await aluno.setTurmas(turmas);
    }

    return res.json(aluno);
  }

  async update(req, res) {
    if (!(await validateId(req.params.id, res))) return;
    if (!(await validateSchema(req.body, ALUNO_SCHEMA, res))) return;

    const nUpdated = {
      alunos: 0,
      responsaveis: 0,
      turmas: 0,
    };

    const { responsible, turmas, ...student } = req.body;

    if (responsible && responsible.id !== 1) {
      if (!(await validateId(responsible.id, res))) return;
      if (!(await validateSchema(responsible, RESPONSAVEL_SCHEMA, res))) return;

      nUpdated.responsaveis = (
        await Responsavel.update(
          { ...responsible },
          {
            where: { id: responsible.id },
          }
        )
      )[0];
    }

    nUpdated.alunos = (
      await Aluno.update(
        { ...student },
        {
          where: { id: req.params.id, id_escola: req.userId },
        }
      )
    )[0];

    if (turmas && turmas.length) {
      const aluno = await Aluno.findByPk(req.params.id);
      nUpdated.turmas = (await aluno.setTurmas(turmas)).length;
    }

    return res.json({ nUpdated });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!(await validateId(id, res))) return;

    const nDeleted = {
      alunos: 0,
      responsaveis: 0,
      turmas: 0,
    };

    const aluno = await Aluno.findOne({
      where: { id, id_escola: req.userId },
    });
    if (aluno) {
      const responsibleId = aluno.id_responsavel;

      nDeleted.turmas = await aluno.removeTurmas(await aluno.getTurmas());

      if (responsibleId !== 1) {
        nDeleted.responsaveis = await Responsavel.destroy({
          where: { id: responsibleId },
        });
      }

      nDeleted.alunos = await Aluno.destroy({
        where: { id: req.params.id, id_escola: req.userId },
      });
    }

    return res.json({ nDeleted });
  }
}

export default new AlunosControler();
