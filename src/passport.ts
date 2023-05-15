import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import * as UserService from './modules/users/user.service';
import * as UserRepository from './modules/users/user.repository';
import config from './config';

export const configureBasicStrategy = () => {
  passport.use(new BasicStrategy(async (email, password, done) => {
    try {
      const user = await UserService.getByEmailAndPassword(email, password);

      if (!user) return done(null, false);

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
};

export const configureJWTStrategy = () => {
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
  }, async (jwtPayload, done) => {
    try {
      const user = await UserRepository.getUserByQuery({id: jwtPayload.userId});

      if (!user) return done(null, false, { message: 'Invalid token.' });

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));
};
