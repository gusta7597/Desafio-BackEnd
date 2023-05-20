import express from "express";

const app = express();

app.use(express.json());

const account = { "email": "admin@exemplo.com", "senha": "abcd1234" };

const places = [{ "id": 1, "name": "Parque da Cidade", "latitude": "-23.221112", "longitude": "-45.899678" },
{ "id": 2, "name": "Parque Ulisses Guimarães", "latitude": "-23.180038", "longitude": "-45.884357" }]



function searchPlace(id) {
    return places.findIndex(places => places.id == id);
}

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

app.get('/v2/places', (req, res) => {
    res.status(200).json(places);
})

app.get('/v2/places/:id', (req, res) => {
    let index = searchPlace(req.params.id)
    res.json(places[index]);
})


export default app;