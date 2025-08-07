const { log } = require('console');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.get('/', (req, res) => {
  res.send("Hello Express...  go to url : https://localhost:5000/conversation for botreply..");
});

app.post('/conversation',(req, res) => {
  res.json({
    text: "This is a Replay from chatcmrit-backend...",
    textSource: "bot"
  })
});

app.listen(port, () => {
  console.log(`Server is listening to port:http://localhost:${port}`);
});