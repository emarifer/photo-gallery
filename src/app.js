const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const engine = require('ejs-mate');

require('dotenv').config();

// Initializations
const app = express();
app.locals.prefix = process.env.PREFIX_APP;
require('./database');

// Settings
app.set('port', process.env.PORT || 3003);
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({ storage }).single('image'));
app.use(process.env.PREFIX_APP, express.static(path.join(__dirname, 'public'))); // Set static files folder

// Routes
app.use(process.env.PREFIX_APP, require('./routes'));

module.exports = app;