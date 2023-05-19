const express = require('express');
const path = require('path');
const app = express();

//settings
app.set('port', 1001);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares

// routes
app.use(require('./routes/'));

//static files
app.use(express.static(path.join(__dirname,'public')));

// start server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});