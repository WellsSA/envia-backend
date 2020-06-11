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

export const EMAIL_SCHEMA = {
  message: Yup.object().shape({
    title: Yup.string().required(),
    greeting: Yup.string().required(),
    content: Yup.string().required(),
  }),
  to: Yup.array().of(Yup.number()), // FIXME: make it required
  options: Yup.object().shape({
    replyToResponsible: Yup.bool(),
  }),
};

/* @SEND_CONTROLLER */
export const SEND_PARAMS_SCHEMA = {
  platform: Yup.string().required(),
};

/* @SEND_CONTROLLER */
export const MESSAGE_SCHEMA = {
  from: Yup.string().required(),
  to: Yup.string().required(),
  subject: Yup.string().required(),
  text: Yup.string().required(),
  replyTo: Yup.string().required(),
};

/* @CREDIT_CONTROLLER */
export const CREDIT_PARAMS_SCHEMA = {
  kind: Yup.string().required(),
};

/* @CREDIT_CONTROLLER */
export const CREDIT_BODY_SCHEMA = {
  quantity: Yup.number().required(),
};

export const USER_SCHEMA = {
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
};
