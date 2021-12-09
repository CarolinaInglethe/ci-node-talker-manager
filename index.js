const express = require('express');
const bodyParser = require('body-parser');

// minhas importaçoes:
const readFileTalkers = require('./utils/readFileTalkers.js');
const validateEmail = require('./middlewares/validateEmailMiddleware');
const validatePassword = require('./middlewares/validatePasswordMiddleware');
const authMiddleware = require('./middlewares/authMiddleware.js');
const validateNameNewTalker = require('./middlewares/validadeNameNewTalkerMiddleware');
const validateAgeNewTalker = require('./middlewares/validateAgeNewTalkerWiddleware');
const validateTalkNewTalker1 = require('./middlewares/validadeTalkNewTalkerWiddleware1');
const validateTalkNewTalker2 = require('./middlewares/validateTalkNewTalkerMiddleware2');
// -----------------------

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// -------------------- INICIO REQUESITOS :

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

// Requesito 3:
app.post('/login', validateEmail, validatePassword, (req, res) => {
  const randomString = () => Math.random().toString(36).substr(2);
  const generateToken = () => (randomString() + randomString()).substr(0, 16);
  // string.substr(start, length)
  // referencia : https://medium.com/@norbertofariasmedeiros/five-steps-como-gerar-um-random-token-em-javascript-1e1488a15d28
  return res.status(200).json(generateToken());
});

// Requesito 4:
app.post('/talker',
  authMiddleware,
  validateNameNewTalker,
  validateAgeNewTalker,
  validateTalkNewTalker1,
  validateTalkNewTalker2,
   (req, res) => {
    const { name, age, talk } = req.body;

    res.status(201).json({
      id: 1, name, age, talk,
    });
  });

// --------------------- FIM REQUESITOS.

app.listen(PORT, () => {
  console.log('Online');
});
