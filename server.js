import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(3000, () => {
  console.log('Server is running at http://127.0.0.1:3000');
});