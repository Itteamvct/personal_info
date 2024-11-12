const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  user: 'visys_dev',
  host: '52.66.196.233',
  database: 'devdb',
  password: 'dev@123',
  port: 5432,
});

// Endpoint to store personal information in PostgreSQL
app.post('/api/personal-info', async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO personal_info (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, address]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to store data' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
