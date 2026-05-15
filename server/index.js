const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 8000;

app.use(bodyParser.json());

const initDBConnection = async () => {
  try {
    conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Boonark_Restaurant',
    port: 8889
    })
    } catch (error) {
    console.error('Error connecting to the database:', error.message);
}
};

app.get('/menu/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const [rows] = await conn.execute(`
            SELECT c.price_per_person,c.course_name, m.item_name, m.description, ci.serving_order
            FROM Courses c
            JOIN Course_Items ci ON c.course_id = ci.course_id
            JOIN Menu m ON ci.menu_id = m.menu_id
            WHERE c.course_id = ?
            ORDER BY ci.serving_order ASC
        `, [courseId]);

        res.json({
            course_name: rows[0].course_name,
            menu: rows
        });
  } catch (error) {
    console.error('Error fetching menu:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, async (req, res) => {
    try {
    await initDBConnection();
    console.log(`Server is running on port ${PORT}`);
    } catch (error) {
    console.error('Error starting the server:', error.message);
    }
});