const express = require('express');
const router = express.Router();

const Tacqueria = require('./models/tacqueria');

router.get('/tacquerias', (_, res) => {
    Tacqueria.find()
        .then(tacquerias => res.json(tacquerias))
        .catch(_ => res.status(404).json({ notacqueriasfound: 'No tacquerias found!' }));
});

router.post('/upvote/:id', async (req, res) => {
    try {
        const ret = await Tacqueria.findOneAndUpdate(
                {_id: req.params.id},
                {$inc: {upvotes: 1}},
                {new: true}
            ).exec();
        res.status(200).json(ret);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
