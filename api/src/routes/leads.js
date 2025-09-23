const express = require('express');
const db = require('../db');
const router = express.Router();

// Create lead under specific campaign
router.post('/campaigns/:campaignId/leads', async (req,res)=>{
  const { campaignId } = req.params;
  const { email, phone, stage } = req.body;
  const normEmail = email ? email.toLowerCase() : null;
  const found = await db.query(
    'SELECT * FROM leads WHERE campaign_id=$1 AND (email=$2 OR phone=$3) LIMIT 1',
    [campaignId, normEmail, phone]
  );
  const score = Math.floor(Math.random()*100);
  if (found.rows[0]) {
    const r = await db.query('UPDATE leads SET stage=$1, score=$2, updated_at=now() WHERE id=$3 RETURNING *', [stage || found.rows[0].stage, score, found.rows[0].id]);
    return res.json(r.rows[0]);
  }
  const r = await db.query(
    `INSERT INTO leads (campaign_id,email,phone,stage,score,created_at,updated_at)
     VALUES ($1,$2,$3,$4,$5,now(),now()) RETURNING *`,
    [campaignId, normEmail, phone, stage || 'new', score]
  );
  res.status(201).json(r.rows[0]);
});

// List leads (filter stage)
router.get('/', async (req,res)=>{
  const { stage, campaign } = req.query;
  const params = [];
  let sql = 'SELECT * FROM leads WHERE 1=1';
  if (stage) { params.push(stage); sql += ` AND stage=$${params.length}`; }
  if (campaign) { params.push(campaign); sql += ` AND campaign_id=$${params.length}`; }
  const r = await db.query(sql, params);
  res.json(r.rows);
});

router.put('/:id', async (req,res)=>{
  const { email, phone, stage, score } = req.body;
  const r = await db.query('UPDATE leads SET email=$1, phone=$2, stage=$3, score=$4, updated_at=now() WHERE id=$5 RETURNING *', [email, phone, stage, score, req.params.id]);
  if (!r.rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(r.rows[0]);
});

router.delete('/:id', async (req,res)=>{
  await db.query('DELETE FROM leads WHERE id=$1', [req.params.id]);
  res.status(204).send();
});

module.exports = router;
