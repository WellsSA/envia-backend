import * as Yup from 'yup';
import { validateSchema } from '../../utils/validation';
import importProfessores from './professores.import';
import importCursos from './cursos.import';
import importTurmas from './turmas.import';

const IMPORT_SCHEMA = {
  kind: Yup.string().required(),
};

const IMPORT_HANDLER = {
  professores: importProfessores,
  cursos: importCursos,
  turmas: importTurmas,
  // alunos
  // modelos
};

class ImportController {
  async store(req, res) {
    if (!(await validateSchema(req.params, IMPORT_SCHEMA, res))) return;
    if (!req.file) return res.status(400).json({ error: 'File not found' });

    const { kind } = req.params;

    const importFunction = IMPORT_HANDLER[kind];

    if (!importFunction) {
      return res.status(400).json({ error: 'Invalid kind' });
    }

    const data = await importFunction(req.file.path, req.userId);
    return res.json(data);
  }
}

export default new ImportController();
