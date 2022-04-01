const express = require('express');
const router = express.Router();

const Tacqueria = require('../models/tacqueria');

router.get('/tacquerias', (req, res) => {
    Tacqueria.find()
        .then(tacquerias => res.json(tacquerias))
        .catch(err => res.status(404).json({ notacqueriasfound: 'No tacquerias found!' }))
});

router.put('/upvote/:id', (req, res) => {
    //Tacqueria.findByIdAndUpdate(req.params.id)
});

module.exports = router;
