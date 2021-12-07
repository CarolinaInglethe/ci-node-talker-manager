const fs = require('fs/promises');

const readFileTalkersFunction = async () => {
    try {
      const talkers = await fs.readFile('./talker.json');
      const parseTalkers = JSON.parse(talkers);
      return parseTalkers;
    } catch (err) {
      return [];
    }
  };

module.exports = readFileTalkersFunction;