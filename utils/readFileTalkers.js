const fs = require('fs');

const readFileTalkersFunction = () => {
    try {
      const talkers = fs.readFileSync('./talker.json', 'utf-8');
      const parseTalkers = JSON.parse(talkers);

      return parseTalkers;
    } catch (error) {
      return [];
    }
  };

module.exports = readFileTalkersFunction;