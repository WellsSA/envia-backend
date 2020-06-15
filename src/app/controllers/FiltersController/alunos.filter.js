import { Aluno } from '../../models';
import { EXPECTED_ALUNO } from '../../utils/response';

export default async (ids, userId) => {
  return Aluno.findAll({
    where: {
      id: ids,
      id_escola: userId,
    },
    ...EXPECTED_ALUNO,
  });
};
