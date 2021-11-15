const express = require('express');
const router = express.Router();

router.get('/users/signin', function (req, res) {
    //res.send('Ingresando a la app');
    res.render('users/signin');
})


router.get('/users/signup', function (req, res){
    //res.send('Formulario de autenticacion');
    res.render('users/signup')
})

module.exports = router;