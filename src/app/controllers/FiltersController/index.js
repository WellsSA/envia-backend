import { validateSchema } from '../../utils/validation';
import { FILTER_SCHEMA } from '../../utils/schemas';
import { throwError } from '../../utils/error';

import alunosFilter from './alunos.filter';
import turmasFilter from './turmas.filter';
import professoresFilter from './professores.filter';
import cursosFilter from './cursos.filter';
import responsaveisFilter from './responsaveis.filter';
import todosFilter from './todos.filter';
import aniversariantesFilter from './aniversariantes.filter';

const FILTERS = {
  todos: todosFilter,
  alunos: alunosFilter,
  turmas: turmasFilter,
  professores: professoresFilter,
  cursos: cursosFilter,
  responsaveis: responsaveisFilter,
  aniversariantes: aniversariantesFilter,
};

class FiltersController {
  async index(req, res) {
    if (!(await validateSchema(req.body, FILTER_SCHEMA, res))) return;

    const { criteria } = req.params;
    const { filters } = req.body;

    const filter = FILTERS[criteria];

    if (!filter)
      return res.status(400).json(throwError("there's not a valid filter"));

    const alunos = await filter(filters, req.userId);

    return res.json(alunos);
  }
}

export default new FiltersController();
