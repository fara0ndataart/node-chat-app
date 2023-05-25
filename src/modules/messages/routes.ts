import express from 'express';
import * as controllers from './controllers';
import { validateRequest } from '../../utils/validateRequest';

const router = express.Router();

router.get('/', controllers.getAllMessagesInRoom);
router.post('/', validateRequest(controllers.createMessageInRoom.schema), controllers.createMessageInRoom);
router.put('/:id', controllers.updateMessageInRoom);
router.delete('/:id', controllers.deleteMessageInRoom);

export default router;
