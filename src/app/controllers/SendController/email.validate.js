import { Credits } from '../../schemas';
import { countReponsible } from './query.util';

export default async (students, req) => {
  const { options } = req.body;

  const replyToResponsible = options && options.replyToResponsible;

  const credits = await Credits.findOne({ userId: req.userId });

  if (credits && credits.email) {
    const total = !replyToResponsible
      ? students.length
      : students.length + countReponsible(students);

    return credits.email >= total;
  }
  return false;
};
