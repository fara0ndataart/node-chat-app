import app from "./app";
import config from './config';
import initDatabase from './database';

initDatabase().then(() => {
    const server = app.listen(config.port, () => {
        console.log(`Server started on port ${config.port}`);
    });

    const closeServer = () => {
        server.close(() => {
            console.log('Server closed');
            process.exit(0);
        });
    }

    process.on('SIGTERM', closeServer);
    process.on('SIGINT', closeServer);
});
