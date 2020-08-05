import { SEND_PARAMS_SCHEMA } from '../../utils/schemas';
import { validateSchema } from '../../utils/validation';
import { throwError } from '../../utils/error';
import { Sents } from '../../schemas';

import { getStudents } from './query.util';
import sendMail from './email.send';
import validateMail from './email.validate';

const SEND_PLATFORMS = {
  email: {
    validate: validateMail,
    send: sendMail,
  },
};

class SendController {
  async store(req, res) {
    if (!(await validateSchema(req.params, SEND_PARAMS_SCHEMA, res))) return;
    const { to, message, options } = req.body;
    const { platform } = req.params;

    const status = {};
    const students = await getStudents(to, req.userId);

    if (!students.length)
      return res
        .status(400)
        .json(throwError('You need to select at least one student'));

    await Promise.all(
      platform.split('+').map(async _platform => {
        const platformHandler = SEND_PLATFORMS[_platform];

        if (!platformHandler) {
          return (status[_platform] = throwError('nonexistent platform'));
        }

        if (!(await platformHandler.validate(students, req))) {
          return (status[_platform] = throwError('not enought credits'));
        }

        const hasErrors = await platformHandler.send(students, req);

        if (hasErrors) {
          status[_platform] = throwError('sending failed', hasErrors);
        }

        await Sents.create({
          userId: req.userId,
          message: message.title,
          criteria: (options && options.criteria) || 'ENVIA',
          platforms: platform,
          studentsQuantity: students.length,
          responsibleQuantity: students.reduce(
            (acc, cur) => (acc += cur.id_responsavel !== '1'),
            0
          ),
          to: students.map(({ id, name }) => ({ id, name })),
          hasErrors,
        });

        return (status[_platform] = true);
      })
    );
    return res.json(status);
  }
}

export default new SendController();
