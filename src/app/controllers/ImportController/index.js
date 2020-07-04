import * as Yup from 'yup';
import { validateSchema } from '../../utils/validation';
import { throwError } from '../../utils/error';
import importProfessores from './professores.import';
import importCursos from './cursos.import';
import importTurmas from './turmas.import';
import importModelos from './modelos.import';
import importAlunos from './alunos.import';

const IMPORT_SCHEMA = {
  kind: Yup.string().required(),
};

const IMPORT_HANDLER = {
  professores: importProfessores,
  cursos: importCursos,
  turmas: importTurmas,
  alunos: importAlunos,
  'modelos de mensagens': importModelos,
};

class ImportController {
  async store(req, res) {
    if (!(await validateSchema(req.params, IMPORT_SCHEMA, res))) return;
    if (!req.file) return res.status(400).json(throwError('File not found'));

    const { kind } = req.params;

    console.log({ kind });
    const importFunction = IMPORT_HANDLER[kind];

    if (!importFunction) {
      return res.status(400).json(throwError('Invalid kind'));
    }

    const data = await importFunction(req.file.path, req.userId);
    return res.json(data);
  }
}

export default new ImportController();
