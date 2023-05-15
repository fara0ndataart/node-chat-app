import express from 'express';
import passport from 'passport';
import * as controllers from './controllers';
import { validateRequest } from '../../utils/validateRequest';

const router = express.Router();

router.post('/login',  passport.authenticate('basic', { session: false }), controllers.login);
router.post('/register', validateRequest(controllers.register.schema), controllers.register);
router.get('/account', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    message: 'Account secured route',
    user: req.user
  })
});
export default router;
