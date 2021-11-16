const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/notes/add', function (req, res) {
    res.render('notes/new-note');
});

router.post('/notes/new-note', async function (req, res) {
    //console.log(req.body);
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'Por favor ingrese un titulo.' });
    }
    if (!description) {
        errors.push({ text: 'Por favor ingrese una descripcion.' });
    }
    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    }
    else {
        //res.send('ok');
        const newNote = new Note({title, description});
        await newNote.save();
        //console.log(newNote);
        res.redirect('/notes');
    }
});

router.get('/notes', async function (req, res) {
    const notes = await Note.find();
    res.render('notes/all-notes', {notes});
});

module.exports = router;