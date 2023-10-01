// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.post('/api/summarize', async (req, res) => {
  try {
    const apiUrl = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
    const result = await axios.post(apiUrl, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.HUGGINGFACE_API_TOKEN,
      },
    });

    res.json(result.data[0].summary_text);
  } catch (error) {
    console.error('Error summarizing text:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
