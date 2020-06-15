import { Aluno, Turma, Responsavel } from '../../models';
import { EXPECTED_ALUNO } from '../../utils/response';

const { attributes } = EXPECTED_ALUNO;

export default async (ids, userId) => {
  return Aluno.findAll({
    where: {
      id_escola: userId,
    },
    attributes,
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
        where: {
          id: ids,
        },
      },
    ],
  });
};
