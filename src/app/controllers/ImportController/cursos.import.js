import { extract } from '../../utils/import';
import { validateAndInsert } from '../../utils/validation';
import { Curso } from '../../models';
import { CURSO_SCHEMA } from '../../utils/schemas';

const IMPORT_OPTIONS = {
  skip: 3,
  schema: ['name'],
};

const schema = CURSO_SCHEMA;
const model = Curso;

export default async (destination, userId) => {
  const data = await extract(destination, IMPORT_OPTIONS, {
    id_escola: userId,
  });

  return validateAndInsert(data, schema, async item => {
    const [{ id, name }, isInserted] = await model.findOrCreate({
      where: { name: item.name, id_escola: userId },
    });
    return [{ id, name }, isInserted];
  });
};
