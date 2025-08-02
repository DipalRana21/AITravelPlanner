// import express from 'express';
// import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

// const router = express.Router();

// const GOOGLE_API_KEY = process.env.GOOGLE_PLACE_API_KEY;

// router.post('/search-place', async (req, res) => {
//   const { textQuery } = req.body;

//   if (!textQuery) {
//     return res.status(400).json({ error: 'Missing textQuery' });
//   }

//   try {
//     const url = 'https://places.googleapis.com/v1/places:searchText';

//     const response = await axios.post(
//       url,
//       { textQuery },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Goog-Api-Key': GOOGLE_API_KEY,
//           'X-Goog-FieldMask': 'places.displayName,places.photos,places.id',
//         },
//       }
//     );

//     res.status(200).json(response.data);
//   } catch (err) {
//     console.error('❌ Google Places API error:', err.response?.data || err.message);
//     res.status(500).json({ error: 'Failed to fetch place details', details: err.response?.data });
//   }
// });

// export default router;


import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const GOOGLE_API_KEY = process.env.GOOGLE_PLACE_API_KEY;

// 🔍 1. SEARCH PLACE API
router.post('/search-place', async (req, res) => {
  const { textQuery } = req.body;

  if (!textQuery) {
    return res.status(400).json({ error: 'Missing textQuery' });
  }

  try {
    const url = 'https://places.googleapis.com/v1/places:searchText';

    const response = await axios.post(
      url,
      { textQuery },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_API_KEY,
          'X-Goog-FieldMask': 'places.displayName,places.photos,places.id',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.error('❌ Google Places API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch place details', details: err.response?.data });
  }
});

// 🖼️ 2. PHOTO FETCH PROXY API
router.get('/photo', async (req, res) => {
  const photoName = req.query.name;

  if (!photoName) {
    return res.status(400).json({ error: 'Missing photo name in query parameter: ?name=' });
  }

  try {
    const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=600&maxWidthPx=600&key=${GOOGLE_API_KEY}`;

    const response = await axios.get(photoUrl, {
      responseType: 'arraybuffer',
    });

    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (err) {
    console.error('❌ Failed to fetch photo:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch photo', details: err.response?.data });
  }
});

export default router;
