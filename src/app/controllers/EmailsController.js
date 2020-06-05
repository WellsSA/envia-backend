import { EMAIL_SCHEMA } from '../utils/schemas';
import { validateSchema } from '../utils/validation';
import { prepareMessage } from '../utils/mail';
import { Aluno, Escola, Responsavel } from '../models';
import CreateMail from '../../jobs/CreateMail';

class EmailsController {
  async store(req, res) {
    if (!validateSchema(req.body, EMAIL_SCHEMA, res)) return;

    const {
      filter: { criteria },
      message: { title, greeting, content },
      to,
      options,
    } = req.body;

    const replyToResponsible = options && options.replyToResponsible;
    let responsibleCount = 0;

    const students = await Aluno.findAll({
      where: {
        id: to,
        id_escola: req.userId,
      },
      include: [
        {
          model: Escola,
          as: 'escola',
          attributes: ['name', 'email'],
        },
        {
          model: Responsavel,
          as: 'responsible',
          attributes: ['id', 'name', 'email'],
        },
      ],
      attributes: ['name', 'email'],
    });

    students.forEach(async student => {
      const { name, email, escola, responsible } = student;

      const message = `
          ${prepareMessage(greeting, name)}
          ${prepareMessage(content, name)}
        `;

      await CreateMail.run({
        to: 'Wellington Almeida <wel.cavzod@gmail.com>',
        subject: `Bora lá`,
        body: 'Envio de email no envia',
      });
      // await Queue.add(SendMail.key, {
      //   from: `${escola.nome} <${process.env.MAIL_SENDER}>`,
      //   to: `${nome} <${email}>`,
      //   subject: titulo,
      //   text: message,
      //   replyTo: `${escola.nome} <${escola.email}>`,
      // });

      // if (responsavel.id !== 1) {
      //   await Queue.add(SendMail.key, {
      //     from: `${escola.nome} <${process.env.MAIL_SENDER}>`,
      //     to: `${responsavel.nome} <${responsavel.email}>`,
      //     subject: titulo,
      //     text: `
      //       Olá, segue a cópia da mensagem que enviamos para o aluno ${nome}
      //       ${message}
      //     `,
      //     replyTo: `${escola.nome} <${escola.email}>`,
      //   });
      //   responsibleCount++;
      // }

      return 0;
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

    return res.json({ ok: true, students });
  }
}

export default new EmailsController();
