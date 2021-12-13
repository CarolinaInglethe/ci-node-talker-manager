const fs = require('fs');

const readFileTalkersFunction = async () => {
    try {
      const talkers = await fs.readFileSync('./talker.json');
      const parseTalkers = JSON.parse(talkers);
      
      return parseTalkers;
    } catch (err) {
      return [];
    }
  };

module.exports = readFileTalkersFunction;