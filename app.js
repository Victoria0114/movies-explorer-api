require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { DEV_DATA_BASE_PATH, DEV_BASE_PATH, DEV_PORT } = require('./utils/config');
const router = require('./routes/index');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
//const { authLimiter } = require('./utils/limiter');

const {
  NODE_ENV, DATA_BASE_PATH, PORT, BASE_PATH,
} = process.env;

const app = express();

// app.listen(DEV_PORT, () => console.log(`App listening on port: ${DEV_PORT}`));

// mongoose.connect(DEV_DATA_BASE_PATH)
//   .then(() => console.log('Connected to db'))
//   .catch((err) => console.error('Error:', err));

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(requestLogger);
//app.use(authLimiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(error);

async function main() {
  await mongoose.connect(NODE_ENV === 'production' ? DATA_BASE_PATH : DEV_DATA_BASE_PATH, { useNewUrlParser: true });
  console.log('Connected to db');
  await app.listen(NODE_ENV === 'production' ? PORT : DEV_PORT, () => {
    console.log(`App listening on port: ${NODE_ENV === 'production' ? PORT : DEV_PORT}`);
    console.log(NODE_ENV === 'production' ? `${BASE_PATH}:${PORT}` : DEV_BASE_PATH);
  });
}

main();
