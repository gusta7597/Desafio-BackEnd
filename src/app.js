import express from "express";

const app = express();

app.use(express.json());

const account = { "email": "admin@exemplo.com", "senha": "abcd1234" };


app.get('/', (req, res) => {
    res.status(200).send('Desafio BackEnd');
})

app.get('/v1', (req, res) => {
    res.status(200).json({ "message": "Bem vindo a GeoPoly" });
})

app.post('/auth', (req, res) => {
    const { email, senha } = req.body
    if (email === account.email && senha === account.senha) {
        res.status(200).json({ message: "Autenticado Com Sucesso" });
    } else if (email != account.email || senha != account.senha) {
        res.status(401).json({ message: "Falha ao autenticar" });
    } else {
        res.status(400).json({ message: "Formato de Requisição invalido" });
    }

})

export default app;