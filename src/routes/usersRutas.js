const { text } = require('express');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/users/signin', function (req, res) {
    //res.send('Ingresando a la app');
    res.render('users/signin');
});


router.get('/users/signup', function (req, res) {
    //res.send('Formulario de autenticacion');
    res.render('users/signup')
});

router.post('/users/signup', async function (req, res) {
    const obj = JSON.parse(JSON.stringify(req.body));
    const { name, email, password, confirm_password } = JSON.parse(JSON.stringify(req.body));
    const errors = [];
    //console.log(obj);
    if (name.length <= 0) {
        errors.push({ text: 'Por favor incerte su nombre.' });
    }
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden.' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Las contraseñas debe ser mayor a 4 caracteres.' });
    }
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
        errors.push({ text: 'Este correo electronico ya esta en uso.' });
        req.flash('error_msg', 'Este correo electronico ya esta en uso.');
        res.redirect('/users/signup');
    }
    const nameUser = await User.findOne({ name: name });
    if (nameUser) {
        errors.push({ text: 'Este nombre ya esta en uso.' });
        req.flash('error_msg', 'Este nombre ya esta en uso.');
        res.redirect('/users/signup');
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    }
    else {
        //res.send('ok');
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Usuario registrado');
        res.redirect('/users/signin');
    }
    //console.log(obj);
});
module.exports = router;