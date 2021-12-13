const validateWatchedAtAndRate = (req, res, next) => {
    const { talk } = req.body;
    const regexData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    
    if (!regexData.test(talk.watchedAt)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (talk.rate < 1 || talk.rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

// // https://www.guj.com.br/t/resolvido-como-validar-data-com-java-script/276656/2
// // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions

module.exports = validateWatchedAtAndRate;