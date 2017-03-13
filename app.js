/* Dependencies:
*********************************************/

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


/* Connection to MongoDB database using ODM:
*********************************************/

mongoose.connect(config.database);

mongoose.connection.on('connected', () => { console.log('Connected to database ' + config.database); });
mongoose.connection.on('error', (err) => { console.log('Database error ' + err); });


/* Misc configs:
*********************************************/

const app = express();

const users = require('./routes/users');

const port = process.env.port || 8080;


/* CORS middleware:
*********************************************/

app.use(cors());


/* Set static folder:
*********************************************/

app.use(express.static(path.join(__dirname, 'public')));


/* Body parser middleware:
*********************************************/

app.use(bodyParser.json());

/* Passport middleware:
*********************************************/

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);


/* Index route:
*********************************************/

app.get('/', (req, res) => { res.send('Invalid endpoint'); });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => { console.log('Server started on port ' + port); });
