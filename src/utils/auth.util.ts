import { PRIVATE_ACCESS_TOKEN_KEY, PUBLIC_ACCESS_TOKEN_KEY } from '../config/auth.config';
import jwt from 'jsonwebtoken';
import {IUser} from '../models/user';

export interface AccessTokenPayload {
  sub: string;
  name: string;
  email: string;
}

function createPayload(user: IUser): AccessTokenPayload {
  return {
    sub: user.id,
    name: user.name,
    email: user.email,
  }
}

export function createAccessToken(user: IUser, expiresIn = '1h') {
  const payload = createPayload(user);
  return jwt.sign(payload, PRIVATE_ACCESS_TOKEN_KEY, { algorithm: 'RS256', expiresIn });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, PUBLIC_ACCESS_TOKEN_KEY);
}
