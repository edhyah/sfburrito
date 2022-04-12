const express = require('express');
const router = express.Router();

const Likes = require('./models/likes');
const Tacqueria = require('./models/tacqueria');

router.get('/api/tacquerias', (_, res) => {
    try {
        Tacqueria.find()
            .then(tacquerias => res.json(tacquerias))
            .catch(_ => res.status(404).json({ notacqueriasfound: 'No tacquerias found!' }));
    } catch (err) {
        console.log(err);
    }
});

router.post('/api/upvote/:id', async (req, res) => {
    try {
        const ret = await Tacqueria.findOneAndUpdate(
                {_id: req.params.id},
                {$inc: {upvotes: 1}},
            ).exec();
        res.status(200).json(ret);
    } catch (err) {
        console.log(err);
    }
});

router.post('/api/downvote/:id', async (req, res) => {
    try {
        const ret = await Tacqueria.findOneAndUpdate(
                {_id: req.params.id},
                {$inc: {upvotes: -1}},
            ).exec();
        res.status(200).json(ret);
    } catch (err) {
        console.log(err);
    }
});

router.get('/api/like', (_, res) => {
    try {
        Likes.find()
            .then(likes => res.json(likes[0]))
            .catch(_ => res.status(404).json({ nolikesfound: 'No likes found!' }));
    } catch (err) {
        console.log(err);
    }
});

router.post('/api/like', async (_, res) => {
    try {
        const ret = await Likes.findOneAndUpdate(
                {_id: '624a9cbb9f0d796cbefc16cd'},
                {$inc: {numLikes: 1}},
            ).exec();
        res.status(200).json(ret);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
