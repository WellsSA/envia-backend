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
    const turmas = [];
    const responsible = { id: 1 };
    const responsibleData = {
      name: responsible_name,
      email: responsible_email,
      phone: responsible_phone,
    };

    if (classes) {
      await Promise.all(
        classes.split(';').map(_class => {
          async function search() {
            const classToSearch = _class.trim();
            const foundClass = await Turma.findOne({
              where: { name: classToSearch, id_escola: userId },
            });

            if (foundClass) turmas.push(foundClass);
            else
              throw Error(
                `Não encontramos a turma ${classToSearch}, mas não se preocupe. Você pode cadastrá-la no Envia e importar esta planilha novamente.`
              );
          }

          return search();
        })
      );
    }

    // 2. verify if user has responsible or not and insert responsible
    if (is_responsible === 'NÃO') {
      await validateAndThrow(responsibleData, RESPONSAVEL_SCHEMA);

      const _responsible = await Responsavel.create(responsibleData);

      responsible.id = _responsible.id;
    }

    // 3. insert student with classes and responsible
    const [aluno, isInserted] = await model.findOrCreate({
      where: { email: student.email, id_escola: userId },
      defaults: {
        ...student,
        id_responsavel: responsible.id,
        id_escola: userId,
      },
    });

    if (turmas && turmas.length) {
      await aluno.setTurmas(turmas.map(({ id }) => id));
    }

    return [
      {
        id: aluno.id,
        ...student,
        responsible: {
          id: responsible.id,
          ...responsibleData,
        },
        turmas,
      },
      isInserted,
    ];
  });
};
