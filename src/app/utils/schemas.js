import * as Yup from 'yup';

export const PROFESSOR_SCHEMA = {
  name: Yup.string().required(),
};
