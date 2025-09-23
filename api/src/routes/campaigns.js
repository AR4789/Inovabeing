const express = require('express');
const db = require('../db');
const router = express.Router();

// Create campaign
router.post('/', async (req,res)=>{
  const { name, description, status } = req.body;
  const r = await db.query('INSERT INTO campaigns (name, description, status) VALUES ($1,$2,$3) RETURNING *', [name, description, status || 'active']);
  res.status(201).json(r.rows[0]);
});

// List + basic filter (status)
router.get('/', async (req,res)=>{
  const { status, q } = req.query;
  let sql = 'SELECT * FROM campaigns WHERE 1=1';
  const params = [];
  if (status) { params.push(status); sql += ` AND status = $${params.length}`; }
  if (q) { params.push(`%${q}%`); sql += ` AND (name ILIKE $${params.length} OR description ILIKE $${params.length})`; }
  const r = await db.query(sql, params);
  res.json(r.rows);
});

// Update, Delete
router.put('/:id', async (req,res)=>{
  const { name, description, status } = req.body;
  const r = await db.query('UPDATE campaigns SET name=$1, description=$2, status=$3 WHERE id=$4 RETURNING *', [name, description, status, req.params.id]);
  if (!r.rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(r.rows[0]);
});

router.delete('/:id', async (req,res)=>{
  await db.query('DELETE FROM campaigns WHERE id=$1', [req.params.id]);
  res.status(204).send();
});

module.exports = router;
