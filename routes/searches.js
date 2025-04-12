const express = require('express');
const fs = require('fs');
const router = express.Router();

const FILE_PATH = './searchData.json';


if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, JSON.stringify([]));

router.post('/', (req, res) => {
  const { city } = req.body;
  if (!city) return res.status(400).json({ error: 'City is required' });

  let data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
  if (!data.includes(city)) data.push(city);

  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  res.json({ success: true, city });
});


router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
  res.json(data);
});

module.exports = router;
