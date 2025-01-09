import { PRIVATE_ACCESS_TOKEN_KEY, PUBLIC_ACCESS_TOKEN_KEY } from '../config/auth.config';
import jwt from 'jsonwebtoken';

export interface AccessTokenPayload {
  id: string;
  name: string;
  email: string;
}

export function createAccessToken(payload: AccessTokenPayload, expiresIn = '1h') {
  return jwt.sign(payload, PRIVATE_ACCESS_TOKEN_KEY, { algorithm: 'RS256', expiresIn });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, PUBLIC_ACCESS_TOKEN_KEY);
}
