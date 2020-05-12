import * as Yup from 'yup';
import { validateSchema } from '../../utils/validation';
import importProfessoresFrom from './professores.import';

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
        ? importProfessoresFrom
        : kind === 'cursos'
        ? importProfessoresFrom
        : kind === 'alunos'
        ? importProfessoresFrom
        : kind === 'turmas'
        ? importProfessoresFrom
        : undefined;

    if (!importFunction) {
      return res.status(400).json({ error: 'Invalid kind' });
    }

    const data = await importFunction(req.file.path, req.userId);
    return res.json(data);
  }
}

export default new ImportController();
