require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
 
const PORT = process.env.PORT || 5503; 

app.get('/history/:month/:day', async (req, res) => {
    const { month, day } = req.params; // Extract month and day
    try {
        const response = await axios.get(
            `https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching history data" });
    }
});

app.listen(5503, () => console.log("Server running on port 5503"));
