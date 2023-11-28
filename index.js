import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
// Import the dotenv module use to protect my API key
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.GOOGLE_PLACES_API_KEY;
//console.log(apiKey);

  app.use(express.static('public'));
  app.get('/places', async (req, res) => {
    try {
      const { query } = req.query;
      const apiUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
      //const apiUrl = 'https://places.googleapis.com/v1/places:searchText/json';//Place (New)
      const response = await axios.get(apiUrl, {
        params: {
          query,
          key: apiKey,
        },
      });
      const places = response.data.results;
      res.json(places);
    } catch (error) {
      console.error('Error fetching Google Places API:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

