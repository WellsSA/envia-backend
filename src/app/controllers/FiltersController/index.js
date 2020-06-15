import { validateSchema } from '../../utils/validation';
import { FILTER_SCHEMA } from '../../utils/schemas';
import { throwError } from '../../utils/error';

import alunosFilter from './alunos.filter';
import turmasFilter from './turmas.filter';

const FILTERS = {
  todos: () => ({ error: { message: 'not implemented yet' } }),
  alunos: alunosFilter,
  turmas: turmasFilter,
  professores: () => ({ error: { message: 'not implemented yet' } }),
  cursos: () => ({ error: { message: 'not implemented yet' } }),
  responsaveis: () => ({ error: { message: 'not implemented yet' } }),
};

class FiltersController {
  async index(req, res) {
    if (!(await validateSchema(req.body, FILTER_SCHEMA, res))) return;

    const { criteria } = req.params;
    const { filters } = req.body;

    const filter = FILTERS[criteria];

    if (!filter)
      return res.status(400).json(throwError("There's not a valid filter"));

    const alunos = await filter(filters, req.userId);

    return res.json(alunos);
  }
}

export default new FiltersController();
