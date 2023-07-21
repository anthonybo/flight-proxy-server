const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load environmental variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/flights', async (req, res) => {
  try {
    const apiKey = process.env.API_KEY; // Access the API key from the environmental variable
    const apiUrl = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&limit=100&flight_status=active&arr_iata=${req.query.airport}`;

    console.log('API URL:', apiUrl);

    const response = await axios.get(apiUrl);

    console.log('API RES: ', response.data);

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error fetching flights:', error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error('Error fetching flights:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
