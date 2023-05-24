import express, { Router } from "express";
import dbconfig from "./db/dbconfig.js";
import queryDatabase from "./model/places.js";
import queryDatabaseUsers from "./model/users.js";
import connectToDB from '../src/db/dbconfig.js';
import { auth, start, welcome } from "./controller/versão1.js";
import { placesV2, specificPlaceV2 } from "./controller/versão2.js";
import { allPlacesV3, createPlacesV3, deletePlacesV3, updatePlacesV3 } from "./controller/versão3.js";
import { areaLocalV4, distanceToV4 } from "./controller/versão4.js";

const app = express();
const router = Router();
app.use(express.json());
app.use(router);


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
    allPlacesV3(req, res)
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
    distanceToV4(req, res);
});


router.get('/v4/search', async (req, res) => {
    areaLocalV4(req, res);
});


export default app;