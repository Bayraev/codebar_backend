const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error-middleware'); // custom error middleware
require('dotenv').config();
// Since 2cn commit, creating auth for site
// cookieParser, jsonwebtoken - for generating jwt, bcrypt - cryptography, uuid - generating random stuff for id for exmp

const { MONGO_DB, PORT, CLIENT_URL, CLIENT_URL2 } = process.env;

app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [`${CLIENT_URL}`, [`${CLIENT_URL2}`]],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200, //? It helped me to allow cors https://my-js.org/docs/cheatsheet/cors/
  }),
);
app.use(morgan('dev'));
// We can use this route "/api" to got access to this route
// app.use(require('/api'. './routes/routes'));
app.use(require('./routes/routes'));
app.use(errorMiddleware);

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_DB, (error) => {
  if (error) {
    console.log('Ошибка подключени к MongoDB');
  }
  console.log('Успешное подключение к MongoDB');
});

app.listen(PORT, (error) => {
  if (error) {
    console.log('Ошибка при соединении с сервером (порт)');
  }
  console.log(`Успех: сервер прослушивается на порту: ${PORT}`);
});
