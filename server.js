const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/ping', (req, res) => {
    res.send('Hello, World!');
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