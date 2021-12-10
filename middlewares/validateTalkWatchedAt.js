const validateTalkWatchedAt = (req, res, next) => {
    const { talk } = req.body;
    
    if (!talk || !talk.watchedAt) {
        return res.status(400)
        .json({ 
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
        });
    }
    if (!(talk.watchedAt instanceof Date)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

// https://www.horadecodar.com.br/2021/04/29/como-detectar-uma-data-invalida-em-javascript/
// O operador instanceof testa se um objeto tem, em seu prototype, a função construtora.

module.exports = validateTalkWatchedAt;