import * as Yup from 'yup';

const validateSchema = async (data, schema, res) => {
  const _schema = Yup.object().shape(schema);

  if (!(await _schema.isValid(data))) {
    return void res.status(400).json({ error: 'Bad request' });
  }

  return true;
};

const validateId = async (id, res) => {
  return validateSchema({ id }, { id: Yup.number().required() }, res);
};

export { validateSchema, validateId };
