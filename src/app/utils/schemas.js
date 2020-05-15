import * as Yup from 'yup';

export const PROFESSOR_SCHEMA = {
  name: Yup.string().required(),
};

export const CURSO_SCHEMA = {
  name: Yup.string().required(),
};

export const TURMA_SCHEMA = {
  name: Yup.string().required(),
  days: Yup.string(),
  hours: Yup.string(),
  course: Yup.object().shape({
    id: Yup.number().required(),
  }),
  teacher: Yup.object().shape({
    id: Yup.number().required(),
  }),
};
