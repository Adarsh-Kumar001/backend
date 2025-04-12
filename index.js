const dotenv = require('dotenv'); 
dotenv.config(); 
const express = require('express');

const cors = require('cors');

const weatherRoutes = require('./routes/weather');
const searchRoutes = require('./routes/searches');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRoutes);
app.use('/api/search', searchRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


