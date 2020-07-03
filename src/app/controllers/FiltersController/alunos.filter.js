import { Aluno } from '../../models';
import { EXPECTED_ALUNO } from '../../utils/response';

export default async (_, userId) => {
  return Aluno.findAll({
    where: {
      id_escola: userId,
    },
    ...EXPECTED_ALUNO,
  });
};
