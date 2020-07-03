import { validateOnlySchema } from '../../utils/validation';
import { EMAIL_SCHEMA } from '../../utils/schemas';

import { prepareMessage } from '../../utils/mail';
import { throwError } from '../../utils/error';

import CreateMail from '../../../jobs/CreateMail';

const createMail = async ({ from, to, subject, text, replyTo }) => {
  try {
    await CreateMail.run({ from, to, subject, text, replyTo });
    return false;
  } catch (err) {
    return throwError('internal system failure');
  }
};

export default async (students, req) => {
  if (!(await validateOnlySchema(req.body, EMAIL_SCHEMA))) return;

  const {
    message: { title, greeting, content },
    options,
  } = req.body;

  const replyToResponsible = options && options.replyToResponsible;
  let responsibleCount = 0;

  const errors = [];

  for (const student of students) {
    const { id, name, email, escola, responsible } = student;

    const titleF = prepareMessage(title, name);
    const message = `${prepareMessage(greeting, name)}\n${prepareMessage(
      content,
      name
    )}`;

    const hasError = await createMail({
      from: `${escola.name} <${process.env.MAIL_SENDER}>`,
      // to: `${name} <${email}>`,
      to: 'Well <wel.cavzod@gmail.com>', // FIXME: desmockar email
      subject: titleF,
      text: message,
      replyTo: `${escola.name} <${escola.email}>`,
    });

    if (hasError) {
      errors.push({ student: { id, name }, ...hasError });
      continue;
    }

    if (replyToResponsible && responsible.id !== 1) {
      const responsibleMessage = `Olá [NOME], segue a cópia da mensagem que enviamos para o aluno ${name}.\n${message}`;

      await createMail({
        from: `${escola.name} <${process.env.MAIL_SENDER}>`,
        // to: `${responsible.name} <${responsible.email}>`,
        to: 'Well <wel.cavzod@gmail.com>', // FIXME: desmockar email
        subject: `Cópia: ${titleF}`,
        text: prepareMessage(responsibleMessage, responsible.name),
        replyTo: `${escola.name} <${escola.email}>`,
      });

      responsibleCount++;
    }
  }

  return errors.length ? errors : false;
};
