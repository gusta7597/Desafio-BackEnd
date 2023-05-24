
import connectToDB from '../db/dbconfig.js';

export async function allPlacesV3(req,res) {
    const pool = connectToDB();
    try { 
        const query = 'SELECT * FROM places';
        const result = await pool.query(query);

        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao realizar a consulta:', error);
        res.status(500).json({ message: 'Erro ao realizar a consulta' });
    } 
    pool.end();
}

export async function createPlacesV3(req, res) {
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
}

export async function updatePlacesV3(req, res) {
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
}
export async function deletePlacesV3(req, res) {
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
}