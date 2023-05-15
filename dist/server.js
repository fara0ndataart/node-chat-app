"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const logger = require('../src/winston');
const router = express_1.default.Router();
const PORT = process.env.PORT || 8082;
const app = (0, express_1.default)();
// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
router.get('/', (req, res) => {
    logger.log("debug", "Hello, Winston!");
    logger.debug("The is the home '/' route.");
    res.status(200).send("Logging Hello World..");
});
app.use('/', router);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//# sourceMappingURL=server.js.map