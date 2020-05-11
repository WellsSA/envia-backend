import * as Yup from 'yup';
import { validateSchema } from '../../utils/validation';

const IMPORT_SCHEMA = {
  kind: Yup.string().required(),
};

class ImportController {
  async store(req, res) {
    if (!(await validateSchema(req.params, IMPORT_SCHEMA, res))) return;

    switch (req.params.kind) {
      case 'professores':
        // console.log('req.params.kind:', req.params.kind);
        return res.json(req.file);
      default:
        return res.status(400).json('Invalid kind');
    }
  }
}

export default new ImportController();
