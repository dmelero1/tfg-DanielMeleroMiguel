import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dmsport',
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

app.get('/exercises', (req, res) => {
  const sql = 'SELECT * FROM exercises';
  
  db.query(sql, (err, results: any[]) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).json({ error: 'Error al obtener ejercicios' });
      return;
    }

    const formatted = results.map((row: any) => ({
      ...row,
      beneficios: row.beneficios ? row.beneficios.split("\n") : [],
      pasos: row.pasos ? row.pasos.split("\n") : [],
    }));

    res.json(formatted);
  });
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}/exercises`);
});
