import type { Request, Response } from 'express';
import Joi from 'joi';
import * as MessagesRepository from '../messages.repository';

const schema = Joi.object({
  body: Joi.object({
    sender_id: Joi.number().required(),
    receiver_id: Joi.number().required(),
    room_id: Joi.number().required(),
    text: Joi.string().required(),
  }),
});

export const getAllMessagesInRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.body;
    const messages = await MessagesRepository.getAllMessagesInRoom(roomId);

    res.status(200).json({
      messages,
    });
  } catch (error) {
    throw error;
  }
};

export const createMessageInRoom = async (req: Request, res: Response) => {
  const message = await MessagesRepository.createMessageInRoom(req.body);

  res.status(200).json({
    message,
  });
};

export const updateMessageInRoom = async (req: Request, res: Response) => {
  const { id, text } = req.body;
  const message = await MessagesRepository.updateMessageInRoom(id, text);

  res.status(200).json({
    message,
  });
};

export const deleteMessageInRoom = async (req: Request, res: Response) => {
  await MessagesRepository.deleteMessageInRoom(req.params.id);

  res.status(200).json({
    message: 'OK',
  });
};

createMessageInRoom.schema = schema;
