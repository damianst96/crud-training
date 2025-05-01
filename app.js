const express = require("express");
const morgan = require("morgan");
const path = require('path');

// Initializations
const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

// Public
const publicPath = path.resolve(__dirname, './src/public');
app.use(express.static(publicPath));

// Global variables

// Routes
const indexRouter = require("./src/routes/indexRouter");
app.use(indexRouter);

app.use(function(req, res, next){
    res.status(404).render('error404');
});

// Starting the server
app.listen(4000, function(){
    console.log(`Servidor corriendo en Puerto 4000`);
});