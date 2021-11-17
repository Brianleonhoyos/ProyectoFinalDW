const { text } = require('express');
const express = require('express');
const router = express.Router();

router.get('/users/signin', function (req, res) {
    //res.send('Ingresando a la app');
    res.render('users/signin');
});


router.get('/users/signup', function (req, res){
    //res.send('Formulario de autenticacion');
    res.render('users/signup')
});

router.post('/users/signup', function (req, res){
    const {name, email, password, confirm_password} = req.body;
    const errors =[];
    console.log(req.body);
    if(name.length <= 0){
        errors.push({text:'Por favor incerte un nombre'});
    }
    if(email.length <= 0){
        errors.push({text:'Por favor incerte un email'});
    }
    if(password != confirm_password){
        errors.push({text: 'La contraseña no coincide.'});
    }
    if(password.length > 4){
        errors.push({text: 'La contraseña deberia ser mayor a 4 caracteres.'})
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, name, email, password, confirm_});
    }else{
        res.send('ok');
    }
    res.send('ok');
});
module.exports = router;