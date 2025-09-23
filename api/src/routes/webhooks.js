const express = require('express');
const db = require('../db');
const router = express.Router();
require('dotenv').config();

router.post('/leads.ingest', async (req, res) => {
  const incomingKey = req.headers['x-api-key'];
  const expected = process.env.API_KEY;
  if (!incomingKey || incomingKey !== expected) return res.status(401).json({ error: 'Invalid API key' });

  const payload = Array.isArray(req.body) ? req.body : [req.body];
  const results = [];
  for (const itm of payload) {
    const campaignId = itm.campaignId;
    const email = itm.email ? itm.email.toLowerCase() : null;
    const phone = itm.phone || null;
    const c = await db.query('SELECT id FROM campaigns WHERE id=$1', [campaignId]);
    if (!c.rows[0]) {
      results.push({ ok: false, reason: 'campaign_not_found', campaignId });
      continue;
    }
    const found = await db.query('SELECT * FROM leads WHERE campaign_id=$1 AND (email=$2 OR phone=$3) LIMIT 1', [campaignId, email, phone]);
    const score = Math.floor(Math.random()*100);
    if (found.rows[0]) {
      const r = await db.query('UPDATE leads SET stage=$1, score=$2, updated_at=now() WHERE id=$3 RETURNING *', [itm.stage || found.rows[0].stage, score, found.rows[0].id]);
      results.push({ ok: true, action: 'updated', lead: r.rows[0]});
    } else {
      const r = await db.query('INSERT INTO leads (campaign_id,email,phone,stage,score,created_at,updated_at) VALUES ($1,$2,$3,$4,$5,now(),now()) RETURNING *',
        [campaignId, email, phone, itm.stage || 'new', score]);
      results.push({ ok: true, action: 'created', lead: r.rows[0]});
    }
  }
  res.json({ results });
});

module.exports = router;
