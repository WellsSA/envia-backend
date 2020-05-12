import { extract } from '../../utils/import';
import { validateOnlySchema } from '../../utils/validation';
import { Professor } from '../../models';
import { PROFESSOR_SCHEMA } from '../../utils/schemas';

const IMPORT_PROFESSORES = {
  skip: 3,
  schema: ['name'],
};

export default async (destination, userId) => {
  const data = await extract(destination, IMPORT_PROFESSORES, {
    id_escola: userId,
  });

  const inserted = [];
  const errored = [];

  for (const item of data) {
    if (await validateOnlySchema(item, PROFESSOR_SCHEMA)) {
      inserted.push(await Professor.create(item));
    } else {
      errored.push(item);
    }
  }

  return { inserted, errored };
};
