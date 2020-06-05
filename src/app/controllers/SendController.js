import { EMAIL_SCHEMA } from '../utils/schemas';
import { validateSchema } from '../utils/validation';
import { prepareMessage } from '../utils/mail';
import { Aluno, Escola, Responsavel } from '../models';
import CreateMail from '../../jobs/CreateMail';

class EmailsController {
  async store(req, res) {
    if (!validateSchema(req.body, EMAIL_SCHEMA, res)) return;

    const {
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

      const message = `${prepareMessage(greeting, name)}\n${prepareMessage(
        content,
        name
      )}
        `;

      await CreateMail.run({
        from: `${escola.name} <${process.env.MAIL_SENDER}>`,
        // to: `${name} <${email}>`,
        to: 'Well <wel.cavzod@gmail.com>',
        subject: title,
        text: message,
        replyTo: `${escola.name} <${escola.email}>`,
      });

      if (replyToResponsible && responsible.id !== 1) {
        const responsibleMessage = `Olá [NOME], segue a cópia da mensagem que enviamos para o aluno ${name}.\n${message}`;
        await CreateMail.run({
          from: `${escola.name} <${process.env.MAIL_SENDER}>`,
          // to: `${responsible.name} <${responsible.email}>`,
          to: 'Well <wel.cavzod@gmail.com>',
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

    return res.json({ ok: true, students });
  }
}

export default new EmailsController();
