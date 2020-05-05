import { Envio } from '../models';

class EnviosController {
  async index(req, res) {
    const envios = await Envio.findAll({
      where: {
        id_escola: req.userId,
      },
      attributes: [
        'id',
        'sentAt',
        'message',
        'criteria',
        'platforms',
        'studentsQuantity',
        'responsibleQuantity',
        'students',
      ],
    });

    return res.json(envios);
  }
}

export default new EnviosController();
