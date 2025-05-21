import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const port = 3001;
const calendarRouter = express.Router();

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
  console.log(`Servidor corriendo en http://localhost:${port}/exercises`);
});

// verificacion login con bdd
app.post('/users', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error al consultar la base de datos' });
    }

    if (results.length > 0) {
      const user = results[0];
      return res.status(200).json({
        success: true,
        message: 'Login exitoso',
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.rol,
      });
    } else {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }
  });
});

//actualizar data profile
app.put("/update-user", (req, res) => {
  const { email, username, genero, fechaNacimiento } = req.body;

  const sql = `UPDATE users SET username = ?, genero = ?, fecha_nacimiento = ? WHERE email = ?`;

  db.query(sql, [username, genero, fechaNacimiento, email], (err, result) => {
    if (err) {
      console.error("Error al actualizar el usuario:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    return res.status(200).json({ success: true });
  });
});

// obtener calendario de un usuario
calendarRouter.get("/:userId", (req, res) => {
  const { userId } = req.params;
  const sql = `
    SELECT ca.id AS assignmentId, ca.day_of_week, e.id AS exercise_id, e.name AS nombre
    FROM calendar_assignments ca
    JOIN exercises e ON ca.exercise_id = e.id
    WHERE ca.user_id = ?`;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error al obtener el calendario:", err);
      return res.status(500).json({ error: "Error al obtener el calendario" });
    }
    res.json(results);
  });
});

// borrar ejercicio del calendario
calendarRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM calendar_assignments WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar la asignación:", err);
      return res.status(500).json({ error: "Error al eliminar la asignación" });
    }
    res.json({ message: "Asignación eliminada" });
  });
});

// publicar info en el calendario
calendarRouter.post("/", (req, res) => {
  const { user_id, day_of_week, exercise_id } = req.body;
  const sql = `
    INSERT INTO calendar_assignments (user_id, day_of_week, exercise_id)
    VALUES (?, ?, ?)`;
  db.query(sql, [user_id, day_of_week, exercise_id], (err, result) => {
    if (err) {
      console.error("Error al guardar la asignación:", err);
      return res.status(500).json({ error: "Error al guardar la asignación" });
    }
    res.status(201).json({
      message: "Ejercicio añadido al calendario",
      idAssignment: result.insertId
    });
  });
});

// limpiar el calendario
calendarRouter.delete("/clear/:userId", (req, res) => {
  const { userId } = req.params;
  const sql = "DELETE FROM calendar_assignments WHERE user_id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error al borrar el calendario:", err);
      return res.status(500).json({ error: "Error al borrar el calendario" });
    }
    res.json({ message: "Calendario limpio" });
  });
});

app.use("/api/calendar", calendarRouter);
