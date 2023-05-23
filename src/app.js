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
        console.error('Erro ao editar local:', error);
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
        res.status(200).json({ message: 'removido com sucesso' });
        pool.end();
    } catch (error) {
        console.error('Erro ao remover local:', error);
        res.status(500).json({ message: 'Erro ao remover local' });
    }
});



app.get('/v4/places/:id1/distanceto/:id2', async (req, res) => {
    try {
        let id = req.params.id1;
        let id2 = req.params.id2;
        const pool = connectToDB();
        const long1 = {
            text: 'select longitude from places WHERE id = $1;',
            values: [id],
        };
        const long2 = {
            text: 'select longitude from places WHERE id = $1;',
            values: [id2],
        };
        const lat1 = {
            text: 'select latitude from places WHERE id = $1;',
            values: [id],
        };
        const lat2 = {
            text: 'select latitude from places WHERE id = $1;',
            values: [id2],
        };

        const lg1 = await pool.query(long1);
        const lg2 = await pool.query(long2);
        const lt1 = await pool.query(lat1);
        const lt2 = await pool.query(lat2);

        let l1 = lg1.rows[0].longitude;
        let longitude1 = parseFloat(l1)
        let l2 = lg2.rows[0].longitude;
        let longitude2 = parseFloat(l2)
        let l3 = lt1.rows[0].latitude;
        let latitude1 = parseFloat(l3)
        let l4 = lt2.rows[0].latitude;
        let latitude2 = parseFloat(l4)

        let distance = Math.sqrt((longitude1 - longitude2) ** 2 + (latitude1 - latitude2) ** 2)

        res.status(200).json({ message: distance });
        pool.end();
    } catch (error) {
        console.error('Erro ao fazer distancia:', error);
        res.status(500).json({ message: 'Erro ao fazer distancia' });
    }
});


app.get('/v4/search?latitude={latitude}&longitude={longitude}&radius={radius}', async (req, res) => {
    try {
        const { latitude, longitude, radius } = req.query;

        if (!latitude || !longitude || !radius) {
            return res.status(400).json({ error: 'Latitude, longitude e raio são obrigatórios.' });
        }

        const centralLatitude = parseFloat(latitude);
        const centralLongitude = parseFloat(longitude);
        const searchRadius = parseFloat(radius);

        const pool = connectToDB();

        const query = 'SELECT id, latitude, longitude FROM places';
        const result = await pool.query(query);

        const places = result.rows;

        const placesWithDistance = places.map(place => {
            const distance = Math.sqrt(
                Math.pow(place.longitude - centralLongitude, 2) +
                Math.pow(place.latitude - centralLatitude, 2)
            );

            return { ...place, distance };
        });

        const filteredPlaces = placesWithDistance.filter(place => place.distance <= searchRadius);

        res.status(200).json({ places: filteredPlaces });
        pool.end();
    } catch (error) {
        console.error('Erro na busca de lugares:', error);
        res.status(500).json({ error: 'Erro na busca de lugares' });
    }
});

export default app;