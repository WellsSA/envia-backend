import { Aluno, Turma, Responsavel } from '../../models';
import { EXPECTED_ALUNO } from '../../utils/response';

const { attributes } = EXPECTED_ALUNO;

export default async (ids, userId) => {
  return Aluno.findAll({
    where: {
      id_escola: userId,
      id_responsavel: ids,
    },
    ...EXPECTED_ALUNO,
  });
};
