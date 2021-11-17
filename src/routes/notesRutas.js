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
        const newNote = new Note({ title, description });
        await newNote.save();
        //console.log(newNote);
        req.flash('success_msg', 'Nota agregada Satisfactoriamente');
        res.redirect('/notes');
    }
});

router.get('/notes', async function (req, res) {
    const notes = await Note.find().sort({ date: 'desc' });
    //console.log(notes);
    res.render('notes/all-notes', { notes });
});

router.get('/notes/edit/:id', async function (req, res) {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', { note });
});

router.put('/notes/edit-note/:id', async function (req, res) {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Nota actualizada satisfactoriamente');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', async function (req, res) {
    //console.log(req.params.id);
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada satisfactoriamente');
    res.redirect('/notes');
});

module.exports = router;