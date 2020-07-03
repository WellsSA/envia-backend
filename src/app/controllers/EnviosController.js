import { Sents } from '../schemas';

class EnviosController {
  async index(req, res) {
    const envios = (
      await Sents.find({
        userId: 10,
      })
    ).map(
      ({
        sentAt,
        message,
        criteria,
        platforms,
        studentsQuantity,
        responsibleQuantity,
        to,
      }) => ({
        sentAt,
        message,
        criteria,
        platforms,
        studentsQuantity,
        responsibleQuantity,
        to,
      })
    );

    return res.json(envios);
  }
}

export default new EnviosController();
