import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

export const PRIVATE_ACCESS_TOKEN_KEY = fs.readFileSync(
  `${__dirname}/../keys/private_access_token.key`,
  'utf-8',
);
export const PUBLIC_ACCESS_TOKEN_KEY = fs.readFileSync(
  `${__dirname}/../keys/public_access_token.key`,
  'utf-8',
);
export const REFRESH_SECRET: string = process.env.REFRESH_SECRET || 'secret';
