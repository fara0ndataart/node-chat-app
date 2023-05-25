import type { Request, Response } from 'express';
import Joi from 'joi';
import * as ChatRepository from '../chat.repository';

const schema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    creator_id: Joi.number().required(),
  }),
});

export const getAllChatRooms = async (req: Request, res: Response) => {
  try {
    const chats = await ChatRepository.getAllChatRooms().withGraphFetched('[messages]');

    res.status(200).json({
      chats,
    });
  } catch (error) {
    throw error;
  }
};

export const getChatRoom = async (req: Request, res: Response) => {
  const chat = await ChatRepository.getChatRoomById(req.params.id);

  res.status(200).json({
    chat,
  });
};

export const createChatRoom = async (req: Request, res: Response) => {
  const chat = await ChatRepository.createChatRoom(req.body);

  res.status(200).json({
    chat,
  });
};

export const updateChatRoom = async (req: Request, res: Response) => {
  const { name } = req.body;
  const chat = await ChatRepository.updateChatRoomById(req.params.id, name);

  res.status(200).json({
    chat,
  });
};

export const deleteChatRoom = async (req: Request, res: Response) => {
  await ChatRepository.deleteChatRoomById(req.params.id);

  res.status(200).json({
    message: 'OK',
  });
};

createChatRoom.schema = schema;
