import {
  PRIVATE_ACCESS_TOKEN_KEY,
  PUBLIC_ACCESS_TOKEN_KEY,
  PUBLIC_REFRESH_TOKEN_KEY,
  PRIVATE_REFRESH_TOKEN_KEY,
} from '../config/auth.config';
import { IUser } from '../models/user';
import { userService } from '../services/user.service';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface RefreshTokenPayload extends JwtPayload {
  sub: string;
}

export interface AccessTokenPayload extends RefreshTokenPayload {
  name: string;
  email: string;
}

function createAccessTokenPayload(user: IUser): AccessTokenPayload {
  return {
    sub: user.id,
    name: user.name,
    email: user.email,
  };
}

function createRefreshTokenPayload(user: IUser): RefreshTokenPayload {
  return {
    sub: user.id,
  };
}

export function createAccessToken(user: IUser, expiresIn = '1h') {
  const payload = createAccessTokenPayload(user);
  return jwt.sign(payload, PRIVATE_ACCESS_TOKEN_KEY, { algorithm: 'RS256', expiresIn });
}

export function createRefreshToken(user: IUser, expiresIn = '31d') {
  const payload = createRefreshTokenPayload(user);
  return jwt.sign(payload, PRIVATE_REFRESH_TOKEN_KEY, { algorithm: 'RS256', expiresIn });
}

export async function verifyRefreshToken(token: string): Promise<IUser> {
  const payload = jwt.verify(token, PUBLIC_REFRESH_TOKEN_KEY);

  if (typeof payload == 'object' && payload.sub) {
    const user = await userService.getUserById(payload.sub);
    if (user) return user;
  }

  throw Error('something is wrong with refreshToken.');
}
