const express = require('express');
const axios = require('axios');
const router = express.Router();

const apiKey = "79404401fdd9b067c89933c9c2f86fea";
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';


router.get('/', async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
      },
    });

    const data = response.data;
    res.json(formatWeather(data));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather for city' });
  }
});

router.get('/current', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'Latitude and longitude required' });

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: 'metric',
      },
    });

    const data = response.data;
    res.json(formatWeather(data));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather by coordinates' });
  }
});


function formatWeather(data) {
  return {
    name: data.name,
    temp: data.main.temp,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    condition: data.weather[0].main,
  };
}

module.exports = router;
