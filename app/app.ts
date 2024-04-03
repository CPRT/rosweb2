import express from 'express';
import http from 'http';

const app = express();
const httpServer = http.createServer(app);

app.use(express.static('./public'));
httpServer.listen(5000, () => console.log('Server is up and running'));

export { app, httpServer };