const validateValueTalkNewTalker = (req, res, next) => {
    const { talk } = req.body;

    if (talk.watchedAt !== Date()) {
        return res.status(400).json(
            { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
        );
        // https://support.microsoft.com/pt-br/office/criar-uma-regra-de-valida%C3%A7%C3%A3o-para-validar-dados-em-um-campo-b91c6b15-bcd3-42c1-90bf-e3a0272e988d
     }
     if (talk.rate < 1 || talk.rate > 5) {
        return res.status(400).json(
          { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
        );
     }

    next();
};

module.exports = validateValueTalkNewTalker;