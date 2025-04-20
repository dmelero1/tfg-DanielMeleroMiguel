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

const formatText = (text) => {
  if (!text) return [];

  // Elimina [] y ""
  text = text.replace(/[\[\]"]+/g, "");

  // Reemplaza .,  por un separador de línea
  text = text.replace(/\. ?, /g, ".|");

  // Separa por línea
  const lines = text.split("|").map(line => line.trim());

  return lines.filter(line => line.length > 0);
};

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

// todos los ejercicios
app.get('/exercises', (req, res) => {
  const sql = 'SELECT * FROM exercises';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).json({ error: 'Error al obtener ejercicios' });
      return;
    }

    const formatted = results.map((row) => ({
      ...row,
      beneficios: row.beneficios ? row.beneficios.split('\n').map(benefit => benefit.trim()) : [],
      pasos: row.pasos ? row.pasos.split('\n').map(step => step.trim()) : [],
    }));

    res.json(formatted);
  });
});

// detalles ejercicios de id=?
app.get('/exercises/:id', (req, res) => {
  const exerciseId = req.params.id;
  const sql = 'SELECT * FROM exercises WHERE id = ?';

  db.query(sql, [exerciseId], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).json({ error: 'Error al obtener el ejercicio' });
      return;
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Ejercicio no encontrado' });
    }

    const formatted = results[0];

    formatted.beneficios = formatText(formatted.beneficios);
    formatted.pasos = formatText(formatted.pasos);

    res.json(formatted);
  });
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}/exercises`);
});
