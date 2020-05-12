import * as Yup from 'yup';
import { validateSchema } from '../../utils/validation';

const IMPORT_SCHEMA = {
  kind: Yup.string().required(),
};

class ImportController {
  async store(req, res) {
    if (!(await validateSchema(req.params, IMPORT_SCHEMA, res))) return;
    if (!req.file) return res.status(400).json({ error: 'File not found' });

    switch (req.params.kind) {
      case 'professores':
        console.log('req.params.kind:', req.params.kind);
        return res.json(req.file);
      default:
        return res.status(400).json({ error: 'Invalid kind' });
    }
  }
}

export default new ImportController();
