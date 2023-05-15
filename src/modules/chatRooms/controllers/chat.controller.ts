import type { Request, Response } from 'express';
import Joi from 'joi';
import * as ChatService from '../chat.service';

const schema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
  })
});

export const getAllChatRooms = async (req: Request, res: Response) => {
  try {
    const chats = await ChatService.getAllChatRooms();

    res.status(200).json({
      chats
    });
  } catch (error) {
    throw error
  }
};

export const getChatRoom = async (req: Request, res: Response) => {
  const chat = await ChatService.getChatRoomById(req.params.id);

  res.status(200).json({
    chat
  });
};

export const createChatRoom = async (req: Request, res: Response) => {
  const chat = await ChatService.createChatRoom(req.body);

  res.status(200).json({
    chat
  });
};

export const updateChatRoom = async (req: Request, res: Response) => {
  const chat = await ChatService.updateChatRoomById(req.params.id, req.body);

  res.status(200).json({
    chat
  });
};

export const deleteChatRoom = async (req: Request, res: Response) => {
  const chat = await ChatService.deleteChatRoomById(req.params.id);

  res.status(200).json({
    message: 'OK'
  });
};

createChatRoom.schema = schema;
