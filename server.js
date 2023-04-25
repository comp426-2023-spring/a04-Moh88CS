import express from 'express';
import { rps, rpsls } from './lib/rpsls.js';

const app = express();
const DEFAULT_PORT = 5000;
const port = process.argv.includes('--port') ? process.argv[process.argv.indexOf('--port') + 1] : DEFAULT_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/app/', (req, res) => res.sendStatus(200));

app.get('/app/rps/', (req, res) => res.json(rps()));
app.get('/app/rpsls/', (req, res) => res.json(rpsls()));

app.post('/app/rps/play/', (req, res) => {
  const shot = req.body.shot;
  res.json(rps(shot));
});

app.post('/app/rpsls/play/', (req, res) => {
  const shot = req.body.shot;
  res.json(rpsls(shot));
});

app.get('/app/rps/play/:shot', (req, res) => {
  const shot = req.params.shot;
  res.json(rps(shot));
});

app.get('/app/rpsls/play/:shot', (req, res) => {
  const shot = req.params.shot;
  res.json(rpsls(shot));
});

app.use((req, res) => {
  res.status(404).send('404 NOT FOUND');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
