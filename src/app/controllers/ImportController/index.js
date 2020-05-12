import * as Yup from 'yup';
import { validateSchema } from '../../utils/validation';
import importProfessores from './professores.import';
import importCursos from './cursos.import';

const IMPORT_SCHEMA = {
  kind: Yup.string().required(),
};

class ImportController {
  async store(req, res) {
    if (!(await validateSchema(req.params, IMPORT_SCHEMA, res))) return;
    if (!req.file) return res.status(400).json({ error: 'File not found' });

    const { kind } = req.params;

    const importFunction =
      kind === 'professores'
        ? importProfessores
        : kind === 'cursos'
        ? importCursos
        : kind === 'alunos'
        ? importProfessores
        : kind === 'turmas'
        ? importProfessores
        : undefined;

    if (!importFunction) {
      return res.status(400).json({ error: 'Invalid kind' });
    }

    const data = await importFunction(req.file.path, req.userId);
    return res.json(data);
  }
}

export default new ImportController();
