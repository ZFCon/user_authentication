import { PUBLIC_ACCESS_TOKEN_KEY } from '../config/auth.config';
import { userService } from '../services/user.service';
import { AccessTokenPayload } from '../utils/auth.util';
import passport from 'passport';
import { Strategy, ExtractJwt, StrategyOptionsWithSecret } from 'passport-jwt';

const options: StrategyOptionsWithSecret = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUBLIC_ACCESS_TOKEN_KEY,
};

export const JWTStrategy = new Strategy(options, function (jwt_payload: AccessTokenPayload, done) {
  userService.getUserById(jwt_payload.sub).then((user) => {
    done(null, user);
  });
});
