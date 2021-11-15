const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
//Inicializaciones
const app = express();
require('./database');

//Configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.handlebars');

//Funciones ejecutadas antes del servidor
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
//Variables globales

//Rutas
app.use(require('./src/routes/index'));
app.use(require('./src/routes/notes'));
app.use(require('./src/routes/users'));
//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));
//inicializacion servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});