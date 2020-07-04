import { extract } from '../../utils/import';
import { validateAndInsert, validateAndThrow } from '../../utils/validation';
import { Turma, Aluno, Responsavel } from '../../models';
import { IMPORT_ALUNO_SCHEMA, RESPONSAVEL_SCHEMA } from '../../utils/schemas';

const IMPORT_OPTIONS = {
  skip: 4,
  schema: [
    'name',
    'birthDate',
    'email',
    'phone',
    'classes',
    'is_responsible',
    'responsible_name',
    'responsible_email',
    'responsible_phone',
  ],
};

const schema = IMPORT_ALUNO_SCHEMA;
const model = Aluno;

export default async (destination, userId) => {
  const data = await extract(destination, IMPORT_OPTIONS, {
    id_escola: userId,
  });

  return validateAndInsert(data, schema, async item => {
    const {
      classes,
      is_responsible,
      responsible_name,
      responsible_email,
      responsible_phone,
      ...student
    } = item;

    // 1. search for classes based on their names (splitted by ';')
    const idsTurmas = [];
    const responsible = { id: 1 };

    if (classes) {
      await Promise.all(
        classes.split(';').map(_class => {
          async function search() {
            const turma = await Turma.findOne({
              where: { name: _class.trim(), id_escola: userId },
            });

            if (turma) idsTurmas.push(turma.id);
          }

          return search();
        })
      );
    }

    // 2. verify if user has responsible or not and insert responsible
    if (is_responsible === 'NÃO') {
      const data = {
        name: responsible_name,
        email: responsible_email,
        phone: responsible_phone,
      };

      await validateAndThrow(data, RESPONSAVEL_SCHEMA);

      const _responsible = await Responsavel.create(data);

      responsible.id = _responsible.id;
    }

    // 3. insert student with classes and responsible
    const [aluno] = await model.findOrCreate({
      where: { name: student.name, id_escola: userId },
      defaults: {
        ...student,
        id_responsavel: responsible.id,
        id_escola: userId,
      },
    });

    if (idsTurmas && idsTurmas.length) {
      await aluno.setTurmas(idsTurmas);
    }

    return aluno;
  });
};
