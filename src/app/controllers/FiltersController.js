import { Aluno, Responsavel, Turma } from '../models';
// import { validateSchema, validateId } from '../utils/validation';
// import { ALUNO_SCHEMA, RESPONSAVEL_SCHEMA } from '../utils/schemas';
// import { throwError } from '../utils/error';
import { EXPECTED_ALUNO } from '../utils/response';

const criterion = {
  TODOS: 0,
  ALUNOS: 1,
  TURMAS: 2,
  PROFESSORES: 3,
  CURSOS: 4,
  RESPONSAVEIS: 5,
};

class FiltersController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      where: {
        id_escola: req.userId,
      },
      ...EXPECTED_ALUNO,
    });

    return res.json(alunos);
  }
}

export default new FiltersController();
