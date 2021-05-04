const express = require('express');
const cors = require('cors');
require('dotenv').config();
const data = require('./assets/data/weather.json');
const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get('/', function (req, res) {
  res.send(data);
});

app.listen(PORT);
