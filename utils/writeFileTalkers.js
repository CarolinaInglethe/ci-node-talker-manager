const fs = require('fs');

const writeFileTalkers = (NewTalkers) => {
    fs.writeFileSync('../talker.json', JSON.stringify(NewTalkers));
};

module.exports = writeFileTalkers;