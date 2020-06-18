import { Aluno, Escola, Responsavel } from '../../models';
const getStudents = async (ids, userId) =>
  Aluno.findAll({
    where: {
      id: ids,
      id_escola: userId,
    },
    attributes: ['id', 'name', 'email'],
    include: [
      {
        model: Escola,
        as: 'escola',
        attributes: ['name', 'email'],
      },
      {
        model: Responsavel,
        as: 'responsible',
        attributes: ['id', 'name', 'email'],
      },
    ],
  });

export { getStudents };
