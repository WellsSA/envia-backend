import { Op, where, fn, col } from 'sequelize';
import { Aluno } from '../../models';
import { EXPECTED_ALUNO } from '../../utils/response';

export default async (_, userId) => {
  const today = new Date();
  return Aluno.findAll({
    where: {
      [Op.and]: [
        { id_escola: userId },
        where(fn('DAY', col('data_nascimento')), {
          [Op.eq]: today.getDate(),
        }),
        where(fn('MONTH', col('data_nascimento')), {
          [Op.eq]: today.getMonth() + 1,
        }),
      ],
    },
    ...EXPECTED_ALUNO,
  });
};
