import express from 'express';
import * as controllers from './controllers';
import { validateRequest } from '../../utils/validateRequest';

const router = express.Router();

router.get('/', controllers.getAllChatRooms);
router.post('/', validateRequest(controllers.createChatRoom.schema), controllers.createChatRoom);
router.get('/:id', controllers.getChatRoom);
router.put('/:id', controllers.updateChatRoom);
router.delete('/:id', controllers.deleteChatRoom);

export default router;
