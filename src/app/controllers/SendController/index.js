import { SEND_PARAMS_SCHEMA } from '../../utils/schemas';
import { validateSchema } from '../../utils/validation';
import { throwError } from '../../utils/error';

import { getStudents } from './query.util';
import sendMail from './email.send';

const SEND_PLATFORMS = {
  email: {
    validate: async () => true,
    send: sendMail,
  },
};

class SendController {
  async store(req, res) {
    if (!(await validateSchema(req.params, SEND_PARAMS_SCHEMA, res))) return;
    const { to } = req.body;
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

        if (!(await platformHandler.validate())) {
          return (status[_platform] = throwError('not enought credits'));
        }

        const hasErrors = await platformHandler.send(students, req);

        if (hasErrors) {
          return (status[_platform] = throwError('sending failed', hasErrors));
        }

        return (status[_platform] = true);
      })
    );
    return res.json(status);
  }
}

export default new SendController();
