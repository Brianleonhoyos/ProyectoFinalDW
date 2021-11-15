const mongoose = require("mongoose");
const url = 'mongodb://localhost/notes-db-app' /* path of your db */;

//to connect or create our database
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, }).then(() => {
    console.log("Conexión exitosa");
}).catch((e) => console.log("No hay conexión"))