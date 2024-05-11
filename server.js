const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');
const cors = require('cors');

app.use(express.json())

app.use(cors());

app.get('/ping', (req, res) => {
    res.send('Hello, World!');
});

app.get('/anime/:name', async(req, res) => {
try {
    console.log(req.params);
    const options = {
        method: 'GET',
        url: 'https://anime-db.p.rapidapi.com/anime',
        params: {
          page: '1',
          size: '10',
          search: req.params.name,
          genres: 'Fantasy,Drama',
          sortBy: 'ranking',
          sortOrder: 'asc'
        },
        headers: {
            'X-RapidAPI-Key': '409cba03ebmsh4d778f8d697531bp1d06dbjsn85322a08cfbc',
            'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
        }
      };
	const response = await axios.request(options);
	// console.log(response.data);
    res.send(response.data)
} catch (error) {
	console.error(error);
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
