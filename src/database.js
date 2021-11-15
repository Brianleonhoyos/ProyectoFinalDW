const mongoose = require("mongoose");
const url = 'mongodb://localhost/notes-db-app' /* path of your db */;

//to connect or create our database
mongoose.connect(url, {
    /* useCreateIndex: true, */
    useUnifiedTopology: true,
    useNewUrlParser: true,
    /* useFindAndModify: false */
})
    .then(db => console.log('Conexion exitosa'))
    .catch(err => console.error(err));
    /* .then(() => {
        console.log("Conexión exitosa");
    })
    .catch((e) => console.log("No hay conexión")) */