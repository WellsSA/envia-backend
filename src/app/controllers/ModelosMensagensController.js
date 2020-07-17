import { ModeloMensagem } from '../models';
import { validateSchema, validateId } from '../utils/validation';
import { MODELO_SCHEMA } from '../utils/schemas';

class ModelosMensagensController {
  async index(req, res) {
    const modelos = await ModeloMensagem.findAll({
      where: {
        id_escola: req.userId,
      },
      attributes: ['id', 'title', 'greeting', 'content'],
    });

    return res.json(modelos);
  }

  async store(req, res) {
    if (!(await validateSchema(req.body, MODELO_SCHEMA, res))) return;

    const { title, greeting, content } = req.body;

    const modelo = await ModeloMensagem.create({
      title,
      greeting,
      content,
      id_escola: req.userId,
    });

    const created = await ModeloMensagem.findByPk(modelo.id, {
      attributes: ['id', 'title', 'greeting', 'content'],
    });

    return res.json(created);
  }

  async update(req, res) {
    if (!(await validateId(req.params.id, res))) return;
    if (!(await validateSchema(req.body, MODELO_SCHEMA, res))) return;

    const { title, greeting, content } = req.body;

    const [nUpdated] = await ModeloMensagem.update(
      { title, greeting, content },
      {
        where: { id: req.params.id, id_escola: req.userId },
      }
    );

    console.info({ nUpdated });

    const updated = await ModeloMensagem.findByPk(req.params.id, {
      attributes: ['id', 'title', 'greeting', 'content'],
    });

    return res.json(updated);
  }

  async delete(req, res) {
    if (!(await validateId(req.params.id, res))) return;

    const nDeleted = await ModeloMensagem.destroy({
      where: { id: req.params.id, id_escola: req.userId },
    });

    return res.json({ nDeleted });
  }
}

export default new ModelosMensagensController();
