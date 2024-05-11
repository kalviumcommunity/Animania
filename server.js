require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const axios = require('axios');
const cors = require('cors');


app.use(express.json());
app.use(cors());

app.get('/ping', (req, res) => {
    res.send('Hello, World!');
});

app.get('/anime', async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://anime-db.p.rapidapi.com/anime',
            params: {
                page: '1',
                size: '10',
                // search: req.params.name,
                genres: 'Fantasy,Drama',
                sortBy: 'ranking',
                sortOrder: 'asc'
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        if (error.response && error.response.status) {
            // Client-side error
            res.status(error.response.status).json({ error: 'Client-side error occurred.' });
        } else {
            // Server-side error
            res.status(500).json({ error: 'Internal server error occurred.' });
        }
    }
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    
    switch (error.code) {
        case 'EADDRINUSE':
            console.error(`Port ${port} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
});
