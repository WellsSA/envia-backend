import { extract } from '../../utils/import';
import { validateAndInsert } from '../../utils/validation';
import { Turma, Curso, Professor } from '../../models';
import { TURMA_SCHEMA } from '../../utils/schemas';

const IMPORT_OPTIONS = {
  skip: 3,
  schema: ['name', 'days', 'hours', 'course_name', 'teacher_name'],
};

const { course, teacher, ...t_schema } = TURMA_SCHEMA;

const schema = t_schema;
const model = Turma;

export default async (destination, userId) => {
  const data = await extract(destination, IMPORT_OPTIONS, {
    id_escola: userId,
  });

  return validateAndInsert(data, schema, async item => {
    const { course_name, teacher_name, name, ...turma } = item;

    const [{ id: course_id }] = await Curso.findOrCreate({
      where: {
        name: course_name,
        id_escola: userId,
      },
    });

    const [{ id: teacher_id }] = await Professor.findOrCreate({
      where: {
        name: teacher_name,
        id_escola: userId,
      },
    });

    return model.findOrCreate({
      where: { name, id_escola: userId },
      defaults: {
        ...turma,
        id_curso: course_id,
        id_professor: teacher_id,
      },
    });
  });
};
