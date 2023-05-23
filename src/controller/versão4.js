
import connectToDB from '../db/dbconfig.js';

export async function distanceToV4(req, res) {
    try {
    let id = req.params.id1;
    let id2 = req.params.id2;
    const pool = connectToDB();
    const place1 = {
        text: 'select longitude,latitude from places WHERE id = $1;',
        values: [id],
    };
    const place2 = {
        text: 'select longitude,latitude from places WHERE id = $1;',
        values: [id2],
    };

    const lg1 = await pool.query(place1);
    const lg2 = await pool.query(place2);

    let l1 = lg1.rows[0].longitude;
    let longitude1 = parseFloat(l1)
    let l2 = lg1.rows[0].latitude;
    let latitude1 = parseFloat(l2)
    let l3 = lg2.rows[0].longitude;
    let longitude2 = parseFloat(l3)
    let l4 = lg2.rows[0].latitude;
    let latitude2 = parseFloat(l4)

    let distance = Math.sqrt((longitude1 - longitude2) ** 2 + (latitude1 - latitude2) ** 2)

    res.status(200).json({ message: distance });
    pool.end();
} catch (error) {
    console.error('Erro ao fazer distancia:', error);
    res.status(500).json({ message: 'Erro ao fazer distancia' });
}
}

export async function areaLocalV4() {
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
        const long = row.long;
        const long2 = parseFloat(long);
        const resultado = Math.sqrt((long2 - centralLongitude) ** 2 + (lat2 - centralLatitude) ** 2)
        console.log(typeof lat2)
        return resultado
    })
        res.status(200).json({ conta });

} catch (error) {
    console.error('Erro na busca de lugares:', error);
    res.status(500).json({ error: 'Erro na busca de lugares' });
}
pool.end();
}