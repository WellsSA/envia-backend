import * as Yup from 'yup';

const validateOnlySchema = async (data, schema) => {
  const _schema = Yup.object().shape(schema);
  return _schema.isValid(data);
};

const validateSchema = async (data, schema, res) => {
  if (!(await validateOnlySchema(data, schema))) {
    return void res.status(400).json({ error: 'Bad request' });
  }
  return true;
};

const validateId = async (id, res) => {
  return validateSchema({ id }, { id: Yup.number().required() }, res);
};

export { validateSchema, validateId, validateOnlySchema };
