import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';
import { throwError } from '../utils/error';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json(throwError('token not provided'));
  }

  // const [bearer, token] = authHeader.split(' ');
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json(throwError('invalid Token'));
  }
};
