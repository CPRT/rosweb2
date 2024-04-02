import express, { Express } from 'express';

const app: Express = express();

app.use(express.static('./public'));
app.listen(5000, () => console.log('Server is up and running'));