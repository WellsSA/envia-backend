import { Escola, Licenca } from '../../models';
import { addMonths } from 'date-fns';
import log from 'log-to-file';

export default async (userId, kind, quantity) => {
  // 1. get user and license
  const user = await Escola.findByPk(userId, {
    include: [
      {
        model: Licenca,
        as: 'licence',
      },
    ],
  });

  // 2. update license history and add vigency + quantity
  const [licenseUpdated] = await Licenca.update(
    {
      end: addMonths(user.licence.end, quantity), // TODO: NEW DATE
      history: user.licence.history + `,${quantity}m`,
      type: 'ENVIA_PREMIUM',
    },
    { where: { id: user.licence.id } }
  );

  if (!licenseUpdated) {
    log(
      `license not updated for user ${{ userId, id: user.id, kind, quantity }}`,
      'license.errors.log'
    );
  }

  return true;
};
