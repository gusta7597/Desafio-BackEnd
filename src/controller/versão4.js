
import connectToDB from '../db/dbconfig.js';

export async function distanceToV4(req, res) {
    const pool = connectToDB();
    try {
        let id = req.params.id1;
        let id2 = req.params.id2;

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

    } catch (error) {
        console.error('Erro ao fazer distancia:', error);
        res.status(500).json({ message: 'Erro ao fazer distancia' });
    }
    pool.end();
}

export async function areaLocalV4(req,res) {
        const pool = connectToDB();
    try {
        const { latitude, longitude, radius } = req.query;

        if (!latitude || !longitude || !radius) {
            return res.status(400).json({ error: 'Latitude, longitude e raio são obrigatórios.' });
        }

        const centralLatitude = parseFloat(latitude);
        const centralLongitude = parseFloat(longitude);
        const raioBusca = parseFloat(radius);

        const result = await pool.query(`
              SELECT *
              FROM places;
            `);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Nenhum registro encontrado na tabela.' });
        }

        const calculos = [];

        result.rows.forEach(row => {
            const id = row.id;
            const latitude = parseFloat(row.latitude);
            const longitude = parseFloat(row.longitude);
            const resultado = Math.sqrt((centralLongitude - longitude) ** 2 + (centralLatitude - latitude) ** 2)
            if (resultado <= raioBusca) {
                calculos.push({ latitude, longitude, resultado });
                res.json({ id, distance: calculos, message: "dentro do raio", });
            } else {
                res.json({ message: "Não a pontos proximos" })

            }

        });
        calculos.splice(0, meuArray.length);
    } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        res.status(500).json({ error: 'Erro ao obter informações e realizar cálculos.' });
    }
    pool.end();
    };


