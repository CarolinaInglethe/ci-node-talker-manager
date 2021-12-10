const randomString = () => Math.random().toString(36).substr(2);

const generateToken = () => (randomString() + randomString()).substr(0, 16);
// string.substr(start, length)
// referencia : https://medium.com/@norbertofariasmedeiros/five-steps-como-gerar-um-random-token-em-javascript-1e1488a15d28

module.exports = generateToken;