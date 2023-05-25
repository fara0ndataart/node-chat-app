import express, { Application, Request, Response } from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from "morgan";
import dotenv from 'dotenv';
import passport from 'passport';

const app: Application = express();
const server = createServer(app);

import { configureBasicStrategy, configureJWTStrategy } from "./passport";
import { configureSocketIO } from './sockets'
//routes
import usersRouter from './modules/users/routes';
import tokensRouter from './modules/tokens/routes';
import chatsRouter from './modules/chatRooms/routes';
import messagesRouter from './modules/messages/routes';

// middleware
dotenv.config();
configureBasicStrategy();
configureJWTStrategy();
configureSocketIO(server);

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

app.use(usersRouter);
app.use('/token', tokensRouter);
app.use('/chats', chatsRouter);
app.use('/messages', messagesRouter);

// app.use((err: Error, req: Request, res: Response) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

export default server;
