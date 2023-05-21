import express from "express";
import dbconfig from "./db/dbconfig.js";
import queryDatabase from "./model/places.js";
import queryDatabaseUsers from "./model/users.js";
import connectToDB from '../src/db/dbconfig.js';

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


app.get('/v3/places', async (req, res) => {
    try {
        const pool = connectToDB();
        const query = 'SELECT * FROM places';
        const result = await pool.query(query);

        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao realizar a consulta:', error);
        res.status(500).json({ message: 'Erro ao realizar a consulta' });
    } finally {
        pool.end();
    }
});



app.post('/v3/places', async (req, res) => {
    try {
        const { name, latitude, longitude } = req.body
        const pool = connectToDB();
        const query = {
            text: 'INSERT INTO places (nome, latitude, longitude) VALUES ($1, $2, $3)',
            values: [name, latitude, longitude],
        };

        const result = await pool.query(query);
        res.status(200).json({ message: 'Criado com sucesso' });
        pool.end();
    } catch (error) {
        console.error('Erro ao criar local:', error);
        res.status(500).json({ message: 'Erro ao criar local' });
    }
});

app.put('/v3/places/:id', async (req, res) => {
    try {
        let id = req.params.id
        const { name, latitude, longitude } = req.body
        const pool = connectToDB();
        const query = {
            text: 'UPDATE places SET nome = $1, longitude = $2, latitude = $3 WHERE id = $4;',
            values: [name, latitude, longitude, id],
        };

        const result = await pool.query(query);
        res.status(200).json({ message: 'Editado com sucesso' });
        pool.end();
    } catch (error) {
        console.error('Erro ao criar local:', error);
        res.status(500).json({ message: 'Erro ao editar local' });
    }
});

app.delete('/v3/places/:id', async (req, res) => {
    try {
        let id = req.params.id
        const pool = connectToDB();
        const query = {
            text: 'DELETE FROM places WHERE id = $1;',
            values: [id],
        };

        const result = await pool.query(query);
        res.status(200).json({ message: 'Excluido com sucesso' });
        pool.end();
    } catch (error) {
        console.error('Erro ao criar local:', error);
        res.status(500).json({ message: 'Erro ao excluir local' });
    }
});

export default app;