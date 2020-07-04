import { extract } from '../../utils/import';
import { validateAndInsert } from '../../utils/validation';
import { ModeloMensagem } from '../../models';
import { MODELO_SCHEMA } from '../../utils/schemas';

const IMPORT_OPTIONS = {
  skip: 3,
  schema: ['title', 'greeting', 'content'],
};

const schema = MODELO_SCHEMA;
const model = ModeloMensagem;

export default async (destination, userId) => {
  const data = await extract(destination, IMPORT_OPTIONS, {
    id_escola: userId,
  });

  return validateAndInsert(data, schema, async item => model.create(item));
};
