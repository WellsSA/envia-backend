import * as Yup from 'yup';

/* ####### @PROFESSORES_CONTROLLER ####### */

export const PROFESSOR_SCHEMA = {
  name: Yup.string().required(),
};

/* ####### @CURSOS_CONTROLLER ####### */

export const CURSO_SCHEMA = {
  name: Yup.string().required(),
};

/* ####### @TURMAS_CONTROLLER ####### */

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

/* ####### @ALUNOS_CONTROLLER ####### */

export const ALUNO_SCHEMA = {
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string(),
  birthDate: Yup.string().required(),
  turmas: Yup.array().of(Yup.number()),
};

export const RESPONSAVEL_SCHEMA = {
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string(),
};

/* ####### @IMPORT_CONTROLLER ####### */

export const IMPORT_ALUNO_SCHEMA = {
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string(),
  birthDate: Yup.string().required(),
  classes: Yup.string().nullable(),
  is_responsible: Yup.string().oneOf(['SIM', 'NÃO']).required(),
};

/* ####### @MODELOS_MENSAGENS_CONTROLLER ####### */

export const MODELO_SCHEMA = {
  title: Yup.string().required(),
  greeting: Yup.string().required(),
  content: Yup.string().required(),
};

/* ####### @SESSIONS_CONTROLLER ####### */

export const SIGN_IN_SCHEMA = {
  email: Yup.string().required(),
  password: Yup.string().required(),
};

/* ####### @SEND_CONTROLLER ####### */

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

export const SEND_PARAMS_SCHEMA = {
  platform: Yup.string().required(),
};

export const MESSAGE_SCHEMA = {
  from: Yup.string().required(),
  to: Yup.string().required(),
  subject: Yup.string().required(),
  text: Yup.string().required(),
  replyTo: Yup.string().required(),
};

/* ####### @CREDIT_CONTROLLER ####### */

export const CREDIT_PARAMS_SCHEMA = {
  kind: Yup.string().required(),
};

export const CREDIT_BODY_SCHEMA = {
  quantity: Yup.number().required(),
};

/* ####### @USERS_CONTROLLER ####### */

export const USER_SCHEMA = {
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  newPassword: Yup.string(),
};

/* ####### @FILTERS_CONTROLLER ####### */

export const FILTER_SCHEMA = {
  filters: Yup.array().of(Yup.number()),
};

/* ####### @PAYMENTS_CONTROLLER ####### */

export const PAYMENT_QUERY_SCHEMA = {
  'data.id': Yup.string().required(),
  type: Yup.string().required(),
};

export const PAYMENT_API_RESPONSE_SCHEMA = {
  description: Yup.string().required(),
  external_reference: Yup.string().required(),
  status: Yup.string().required(),
};
