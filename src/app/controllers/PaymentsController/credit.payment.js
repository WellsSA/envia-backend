import { Credits } from '../../schemas';

export default async (userId, kind, quantity) => {
  return Credits.findOneAndUpdate(
    { userId },
    { $inc: { [kind]: quantity } },
    { upsert: true }
  );
};
