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

/*const activitiesList = [
    'Shopping', 'Swimming', 'Dancing', 'Cycling', 'Hiking',
    'Museum visit', 'Movie night', 'Coffee tasting', 'Art gallery tour',
    'Beach picnic', 'Yoga session', 'Food tasting', 'Escape room',
    'Karaoke night', 'Bowling', 'Photography walk', 'Concert', 'Book club meeting',
    'Crafting workshop'
];

function getRandomActivityInSingapore(array) {
    return array[Math.floor(Math.random() * array.length)];
}*/

/*function clearInputs() {
    document.getElementById('location').value = '';
    document.getElementById('preference').value = '';
    document.getElementById('recommendationText').innerText = '';
}*/

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

/*function submitForm() {
    const locationInput = document.getElementById('location');
    const location = locationInput.value.trim() || 'Singapore'; //Default to Singapre if no location input is provided
    const preference = document.getElementById('preference').value;

    if (!preference) {
        // Only location is provided or neither location nor preference is provided
        const randomActivity = getRandomActivityInSingapore(activitiesList);
        const query = `${randomActivity} near ${location}`;
        displayRecommendation(query);//how to change this to place
    } else {
        // Both location and preference are provided or only preference is provided
        const query = `${preference} near ${location}`;
        displayRecommendation(query);
    }
}*/

/*function displayRecommendation(query) {

    document.getElementById('recommendationText').innerText = places;
}*/

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

