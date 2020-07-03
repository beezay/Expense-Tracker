const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//MiddleWare
app.use(bodyParser.json());
app.use(cors());

const expenses = require('./routes/api/expense');

app.use('/', expenses);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`App started on port ${port}`));