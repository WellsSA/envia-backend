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
    try {
      await Yup.object().shape(schema).validate(item);
      const [data, isInserted] = await callback(item);
      isInserted && inserted.push(data);
    } catch (error) {
      errored.push({ item, error: error.message });
    }
  }

  return { inserted, errored };
};

const validateAndThrow = async (data, schema) =>
  Yup.object().shape(schema).validate(data);

export {
  validateSchema,
  validateId,
  validateOnlySchema,
  validateAndInsert,
  validateAndThrow,
};
