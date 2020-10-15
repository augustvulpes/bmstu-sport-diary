const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
});

app.post('/api/create', (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server is running on port:', PORT));