import express, { Router } from "express";
import dbconfig from "./db/dbconfig.js";
import queryDatabase from "./model/places.js";
import queryDatabaseUsers from "./model/users.js";
import connectToDB from '../src/db/dbconfig.js';
import { auth, start, welcome } from "./controller/versão1.js";
import { placesV2, specificPlaceV2 } from "./controller/versão2.js";
import { allPlacesV3, createPlacesV3, deletePlacesV3, updatePlacesV3 } from "./controller/versão3.js";
import { distanceToV4 } from "./controller/versão4.js";

const app = express();
const router = Router();
app.use(express.json());
app.use(router);





function searchPlace(id) {
    return places.findIndex(places => places.id == id);
}



router.get('/', (req, res) => {
    start();
})

router.get('/v1', (req, res) => {
    welcome();
})

router.post('/auth', (req, res) => {
    auth();
})

router.get('/v2/places', (req, res) => {
    placesV2();
})

router.get('/v2/places/:id', (req, res) => {
    specificPlaceV2();
})


router.get('/v3/places', async (req, res) => {
    allPlacesV3()
});



router.post('/v3/places', async (req, res) => {
    createPlacesV3(req, res);
});

router.put('/v3/places/:id', async (req, res) => {
    updatePlacesV3(req, res);
});


router.delete('/v3/places/:id', async (req, res) => {
    deletePlacesV3(req, res);
});



router.get('/v4/places/:id1/distanceto/:id2', async (req, res) => {
    distanceToV4(req, res)
});


app.get('/v4/search', async (req, res) => {
    const pool = connectToDB();
    try {
        const { latitude, longitude, radius } = req.query;

        if (!latitude || !longitude || !radius) {
            return res.status(400).json({ error: 'Latitude, longitude e raio são obrigatórios.' });
        }

        const centralLatitude = parseFloat(latitude);
        const centralLongitude = parseFloat(longitude);
        const raioBusca = parseFloat(radius);

        const query = 'SELECT id, latitude, longitude FROM places';
        const result = await pool.query(query);

        const conta = result.rows.map(row => {
            const lat = row.latitude;
            const lat2 = parseFloat(lat);
            console.log(lat2)
            const long = row.long;
            const long2 = parseFloat(long);
            const resultado = Math.sqrt((long2 - centralLongitude) ** 2 + (lat2 - centralLatitude) ** 2)
            console.log(typeof lat2)
            return resultado
        })
            res.status(200).json( conta );

    } catch (error) {
        console.error('Erro na busca de lugares:', error);
        res.status(500).json({ error: 'Erro na busca de lugares' });
    }
    pool.end();
});

export default app;