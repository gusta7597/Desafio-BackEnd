export function welcome() {
    res.status(200).json({ "message": "Bem vindo a GeoPoly" });
}
export function start() {
    res.status(200).send('Desafio BackEnd');
}
const account = { "email": "admin@exemplo.com", "senha": "abcd1234" };
export function auth() {
const { email, senha } = req.body
if (email === account.email && senha === account.senha) {
    res.status(200).json({ message: "Autenticado Com Sucesso" });
} else if (email != account.email || senha != account.senha) {
    res.status(401).json({ message: "Falha ao autenticar" });
} else {
    res.status(400).json({ message: "Formato de Requisição invalido" });
}
}