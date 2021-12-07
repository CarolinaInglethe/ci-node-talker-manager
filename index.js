const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// INICIO REQUESITOS :

// Requesito 1:
app.get('/talker', async (_req, res) => {
  try {
    const talkers = await fs.readFile('./talker.json');
    const parseTalkers = JSON.parse(talkers);
    return res.status(200).json(parseTalkers);
  } catch (err) {
    return res.status(200).json([]);
  }
});

// FIM REQUESITOS.

app.listen(PORT, () => {
  console.log('Online');
});
