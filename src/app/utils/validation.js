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

const validateAndInsert = async (data, schema, callback) => {
  const inserted = [];
  const errored = [];

  for (const item of data) {
    if (await validateOnlySchema(item, schema)) {
      inserted.push(await callback(item));
    } else {
      errored.push(item);
    }
  }

  return { inserted, errored };
};

export { validateSchema, validateId, validateOnlySchema, validateAndInsert };
