import { ModeloMensagem } from '../models';
import * as Yup from 'yup';
import { validateSchema, validateId } from '../utils/validation';

const MODELO_SCHEMA = {
  title: Yup.string().required(),
  greeting: Yup.string().required(),
  content: Yup.string().required(),
};

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

    return res.json(modelo);
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

    return res.json({ nUpdated });
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
