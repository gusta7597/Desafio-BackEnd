import connectToDB from '../db/dbconfig.js';


const queryDatabase = () => {
  const pool = connectToDB();

const queryString = "CREATE TABLE IF NOT EXISTS  places (id SERIAL PRIMARY KEY,nome VARCHAR(255),latitude VARCHAR(20),longitude VARCHAR(20));"

  pool.query(queryString, (err, res) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
    }
    pool.end();
  });
};


queryDatabase();
export default queryDatabase;