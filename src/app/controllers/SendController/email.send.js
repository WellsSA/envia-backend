import { validateOnlySchema } from '../../utils/validation';
import { EMAIL_SCHEMA } from '../../utils/schemas';

import { prepareMessage } from '../../utils/mail';

import CreateMail from '../../../jobs/CreateMail';

export default async (students, req) => {
  if (!(await validateOnlySchema(req.body, EMAIL_SCHEMA))) return;

  const {
    message: { title, greeting, content },
    options,
  } = req.body;

  const replyToResponsible = options && options.replyToResponsible;
  let responsibleCount = 0;

  students.forEach(async student => {
    const { name, email, escola, responsible } = student;

    const message = `${prepareMessage(greeting, name)}\n${prepareMessage(
      content,
      name
    )}
      `;

    await CreateMail.run({
      from: `${escola.name} <${process.env.MAIL_SENDER}>`,
      // to: `${name} <${email}>`,
      to: 'Well <wel.cavzod@gmail.com>', // FIXME: desmockar email
      subject: title,
      text: message,
      replyTo: `${escola.name} <${escola.email}>`,
    });

    if (replyToResponsible && responsible.id !== 1) {
      const responsibleMessage = `Olá [NOME], segue a cópia da mensagem que enviamos para o aluno ${name}.\n${message}`;
      await CreateMail.run({
        from: `${escola.name} <${process.env.MAIL_SENDER}>`,
        // to: `${responsible.name} <${responsible.email}>`,
        to: 'Well <wel.cavzod@gmail.com>', // FIXME: desmockar email
        subject: `Cópia: ${title}`,
        text: prepareMessage(responsibleMessage, responsible.name),
        replyTo: `${escola.name} <${escola.email}>`,
      });
      responsibleCount++;
    }
  });

  //  await EnviosEscola.create({
  //   criterio,
  //   plataforma,
  //   titulo_mensagem: titulo,
  //   qtd_alunos: alunos.length,
  //   qtd_responsaveis: responsibleCount,
  //   alunos: alunos.map(aluno => aluno.nome).join(','),
  //   data_hora_envio:  new Date(),
  //   id_escola: userId
  // });
  return true;
};
