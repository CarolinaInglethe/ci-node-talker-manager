const validatePassword = (req, res, next) => {
    const { password } = req.body;

    if (password === undefined || password.length === 0) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }

    next();
};

module.exports = validatePassword;