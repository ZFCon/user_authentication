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

export const PRIVATE_REFRESH_TOKEN_KEY = fs.readFileSync(
  `${__dirname}/../keys/private_refresh_token.key`,
  'utf-8',
);
export const PUBLIC_REFRESH_TOKEN_KEY = fs.readFileSync(
  `${__dirname}/../keys/public_refresh_token.key`,
  'utf-8',
);
