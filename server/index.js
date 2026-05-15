const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

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

app.get('/courses', async (req, res) => {
  try {
    const [rows] = await conn.execute(`
            SELECT c.course_id, c.course_name, DATE_FORMAT(c.course_day, '%Y-%m-%d') AS course_day, c.price_per_person
            FROM Courses c
            ORDER BY c.course_day ASC
        `);
    res.json(rows.map(row => ({
        course_id: row.course_id,
        course_name: row.course_name,
        course_date: row.course_day,
        course_price: row.price_per_person,
        slots: 6,
    })));
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/course/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const [rows] = await conn.execute(`
            SELECT c.price_per_person,c.course_name, m.item_name, m.description, ci.serving_order, DATE_FORMAT(c.course_day, '%Y-%m-%d') AS course_day
            FROM Courses c
            JOIN Course_Items ci ON c.course_id = ci.course_id
            JOIN Menu m ON ci.menu_id = m.menu_id
            WHERE c.course_id = ?
            ORDER BY ci.serving_order ASC
        `, [courseId]);

        res.json({
            course_name: rows[0].course_name,
            course_date: rows[0].course_day,
            course_price: rows[0].price_per_person,
            menu: rows.map(row => ({
                item_name: row.item_name,
                description: row.description,
                serving_order: row.serving_order,
            }))

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