import { extract } from '../../utils/import';
import { validateAndInsert } from '../../utils/validation';
import { Professor } from '../../models';
import { PROFESSOR_SCHEMA } from '../../utils/schemas';

const IMPORT_OPTIONS = {
  skip: 3,
  schema: ['name'],
};

const schema = PROFESSOR_SCHEMA;
const model = Professor;

export default async (destination, userId) => {
  const data = await extract(destination, IMPORT_OPTIONS, {
    id_escola: userId,
  });

  return validateAndInsert(data, schema, async item => model.create(item));
};
