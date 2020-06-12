import { Curso, Professor, Responsavel, Turma } from '../models';

export const EXPECTED_TURMA = {
  attributes: ['id', 'name', 'days', 'hours'],
  include: [
    {
      model: Curso,
      as: 'course',
      attributes: ['id', 'name'],
    },
    {
      model: Professor,
      as: 'teacher',
      attributes: ['id', 'name'],
    },
  ],
};

export const EXPECTED_ALUNO = {
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
};
