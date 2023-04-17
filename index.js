const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { MONGO_DB, PORT } = process.env;

app.use(express.json({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(require('./routes/routes'));

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
