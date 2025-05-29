import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
const port = 3001;
const calendarRouter = express.Router();

app.use(cors());
app.use(express.json());

const db = await mysql.createPool({
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

// todos los ejercicios
app.get('/exercises', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM exercises');
    const formatted = results.map((row) => ({
      ...row,
      beneficios: row.beneficios ? row.beneficios.split('\n').map(benefit => benefit.trim()) : [],
      pasos: row.pasos ? row.pasos.split('\n').map(step => step.trim()) : [],
    }));
    res.json(formatted);
  } catch (err) {
    console.error('Error en la consulta:', err);
    res.status(500).json({ error: 'Error al obtener ejercicios' });
  }
});

// detalles ejercicios de id=?
app.get('/exercises/:id', async (req, res) => {
  const exerciseId = req.params.id;
  try {
    const [results] = await db.query('SELECT * FROM exercises WHERE id = ?', [exerciseId]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Ejercicio no encontrado' });
    }

    const formatted = results[0];
    formatted.beneficios = formatText(formatted.beneficios);
    formatted.pasos = formatText(formatted.pasos);

    res.json(formatted);
  } catch (err) {
    console.error('Error en la consulta:', err);
    res.status(500).json({ error: 'Error al obtener el ejercicio' });
  }
});

// verificacion login con bdd
app.post('/users', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

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
  } catch (err) {
    console.error('Error en la consulta:', err);
    return res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});

//actualizar data profile
app.put("/update-user", async (req, res) => {
  const { email, username, genero, fechaNacimiento } = req.body;

  try {
    await db.query(
      `UPDATE users SET username = ?, genero = ?, fecha_nacimiento = ? WHERE email = ?`,
      [username, genero, fechaNacimiento, email]
    );

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error al actualizar el usuario:", err);
    return res.status(500).json({ error: "Error en la base de datos" });
  }
});

// obtener calendario de un usuario
calendarRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [results] = await db.query(`
      SELECT ca.id AS assignmentId, ca.day_of_week, e.id AS exercise_id, e.name AS nombre
      FROM calendar_assignments ca
      JOIN exercises e ON ca.exercise_id = e.id
      WHERE ca.user_id = ?`, [userId]);

    res.json(results);
  } catch (err) {
    console.error("Error al obtener el calendario:", err);
    return res.status(500).json({ error: "Error al obtener el calendario" });
  }
});

// borrar ejercicio del calendario
calendarRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(`DELETE FROM calendar_assignments WHERE id = ?`, [id]);
    res.json({ message: "Asignación eliminada" });
  } catch (err) {
    console.error("Error al eliminar la asignación:", err);
    return res.status(500).json({ error: "Error al eliminar la asignación" });
  }
});

// publicar info en el calendario
calendarRouter.post("/", async (req, res) => {
  const { user_id, day_of_week, exercise_id } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO calendar_assignments (user_id, day_of_week, exercise_id)
      VALUES (?, ?, ?)`, [user_id, day_of_week, exercise_id]);

    res.status(201).json({
      message: "Ejercicio añadido al calendario",
      idAssignment: result.insertId
    });
  } catch (err) {
    console.error("Error al guardar la asignación:", err);
    return res.status(500).json({ error: "Error al guardar la asignación" });
  }
});

// limpiar el calendario
calendarRouter.delete("/clear/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    await db.query("DELETE FROM calendar_assignments WHERE user_id = ?", [userId]);
    res.json({ message: "Calendario limpio" });
  } catch (err) {
    console.error("Error al borrar el calendario:", err);
    return res.status(500).json({ error: "Error al borrar el calendario" });
  }
});

app.use("/api/calendar", calendarRouter);

// obtener IMC actual
app.get('/api/bmi/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const [result] = await db.query("SELECT * FROM bmi WHERE user_id = ?", [userId]);

    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: "No hay IMC calculado aún" });
    }
  } catch (err) {
    console.error("Error al obtener IMC:", err);
    res.status(500).json({ error: "Error al obtener IMC" });
  }
});

// guardar IMC
app.post('/api/bmi', async (req, res) => {
  const { user_id, height_cm, weight_kg, bmi_value } = req.body;

  // valido si los valores realistas
  if (bmi_value < 10 || bmi_value > 70) {
    return res.status(400).json({
      error: "Introduce datos reales. El valor de IMC proporcionado no es creíble."
    });
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query(
      `INSERT INTO bmi_history (user_id, height_cm, weight_kg, bmi_value, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [user_id, height_cm, weight_kg, bmi_value]
    );

    await conn.query(`DELETE FROM bmi WHERE user_id = ?`, [user_id]);
    const [result] = await conn.query(
      `INSERT INTO bmi (user_id, height_cm, weight_kg, bmi_value, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [user_id, height_cm, weight_kg, bmi_value]
    );

    await conn.commit();
    res.status(201).json({
      message: "IMC guardado correctamente",
      id: result.insertId
    });
  } catch (error) {
    await conn.rollback();
    console.error("Error al guardar IMC:", error);
    res.status(500).json({ error: "Error al guardar IMC" });
  } finally {
    conn.release();
  }
});

// obtener historial de IMC
app.get('/api/bmi-history/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const [results] = await db.query(
      "SELECT * FROM bmi_history WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    res.json(results);
  } catch (error) {
    console.error("Error al obtener historial de IMC:", error);
    res.status(500).json({ error: "Error al obtener historial de IMC" });
  }
});

// borrar un historial de IMC
app.delete('/api/bmi-history/:historyId', async (req, res) => {
  const { historyId } = req.params;
  try {
    const [result] = await db.query(
      "DELETE FROM bmi_history WHERE id = ?",
      [historyId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el historial de IMC:", error);
    res.status(500).json({ error: "Error al eliminar el historial de IMC" });
  }
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/exercises`);
});
