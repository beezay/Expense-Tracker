const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//MiddleWare
app.use(bodyParser.json());
app.use(cors());

const expenses = require('./routes/api/expense');

app.use('/api/expense', expenses);

//Handle Production
if(process.env.NODE_ENV === 'production'){
    //static folder
    app.use(express.static(__dirname + '/public'));

    //Handle Single Page Application
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`App started on port ${port}`));