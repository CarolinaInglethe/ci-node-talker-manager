const express = require('express');
const bodyParser = require('body-parser');

const readFileTalkers = require('./utils/readFileTalkers.js');

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
  const talkers = await readFileTalkers();
  return res.status(200).json(talkers);
});

// Requesito 2:
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFileTalkers();

  const userId = talkers.find((talker) => talker.id === Number(id));

  if (!userId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(userId);
});

// FIM REQUESITOS.

app.listen(PORT, () => {
  console.log('Online');
});
