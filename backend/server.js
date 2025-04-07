require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5505;
const axiosInstance = axios.create({ timeout: 10000 });

app.get('/history/wikipedia/:month/:day', async (req, res) => {
    const { month, day } = req.params;
    try {
        const response = await axiosInstance.get(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`);
        res.json(response.data);
    } catch (error) {
        console.error("Wikipedia fetch error:", error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
