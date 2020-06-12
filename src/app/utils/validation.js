import * as Yup from 'yup';
import { throwError } from './error';

const validateOnlySchema = async (data, schema) => {
  const _schema = Yup.object().shape(schema);
  return _schema.isValid(data);
};

const validateSchema = async (data, schema, res) => {
  try {
    await Yup.object().shape(schema).validate(data);
    return true;
  } catch (error) {
    return void res.status(400).json(throwError(error.message));
  }
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
