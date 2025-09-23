const express = require('express');
require('dotenv').config();
const app = express();
const authRoutes = require('./routes/auth');
const campaignsRoutes = require('./routes/campaigns');
const leadsRoutes = require('./routes/leads');
const webhookRoutes = require('./routes/webhooks');
const authMiddleware = require('./middleware/auth');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/campaigns', authMiddleware, campaignsRoutes);
app.use('/api/leads', authMiddleware, leadsRoutes);

const port = process.env.PORT || 8080;
app.listen(port, ()=>console.log(`API listening ${port}`));
