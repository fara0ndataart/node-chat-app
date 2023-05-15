import express from 'express';
import passport from 'passport';
import * as controllers from './controllers'
import { validateRequest } from '../../utils/validateRequest';

const router = express.Router();

router.post('/refresh', passport.authenticate('jwt', { session: false }), validateRequest(controllers.refresh.schema), controllers.refresh);

export default router;
