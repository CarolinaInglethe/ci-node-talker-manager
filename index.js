const express = require('express');
const bodyParser = require('body-parser');

// minhas importaçoes:
const readFileTalkers = require('./utils/readFileTalkers.js');
const writeFileTalkers = require('./utils/writeFileTalkers');
const generateToken = require('./utils/generateToken');
const validateEmail = require('./middlewares/validateEmailMiddleware');
const validatePassword = require('./middlewares/validatePasswordMiddleware');
const validateToken = require('./middlewares/validateTokenMiddlewares.js');
const validateName = require('./middlewares/validadeNameMiddleware');
const validateAge = require('./middlewares/validateAgeWiddleware');
const validateTalk = require('./middlewares/validateTalkMiddleware');
const validateWatchedAtAndRate = require('./middlewares/validateWatchedAtAndRateMiddleware');

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
app.post('/login',
  validateEmail,
  validatePassword, 
  (_req, res) => {
    const token = generateToken();
    res.status(200).json({ token });
  });

// Requesito 4:
app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAtAndRate,
   (req, res) => {
    const { name, age, talk } = req.body;
    // pega os talkers e pega o ultimo da lista:
    const talkers = readFileTalkers();
    const last = talkers[talkers.length - 1];
    // apartir do id do ultimo cria id para o Novo talker que sera adicionado:
    const infoNewTalker = { id: last.id + 1, name, age, talk };
    // salva variavel com novo talker adicionado na lista e escreve no arquivo a nova lista
    const newTalkers = [...talkers, infoNewTalker];
    writeFileTalkers(newTalkers);

    return res.status(201).json(infoNewTalker);
  });

// Requesito 5:
app.put('/talker/:id',
validateToken,
validateName,
validateAge,
validateTalk,
validateWatchedAtAndRate,
(req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;

  const talkers = readFileTalkers();
  const talkerIndex = talkers.findIndex((t) => t.id === Number(id));

  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };

  writeFileTalkers(talkers);
  res.status(200).json(talkers[talkerIndex]);
});

// Requesito 6:
app.delete('/talker/:id',
  validateToken,
  (req, res) => {
    const { id } = req.params;
    const talkers = readFileTalkers();
    // encontra indice baseado no id :
    const talkerIndex = talkers.findIndex((t) => t.id === Number(id));
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex

    talkers.splice(talkerIndex, 1);
    writeFileTalkers(talkers);
    res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  });

// -------------------- FIM REQUESITOS.

app.listen(PORT, () => {
  console.log('Online');
});
