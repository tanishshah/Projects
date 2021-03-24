//Variables 
const express = require('express');
const router = express.Router();
const Bug = require('../models/bugModel');

//GET requests
router.get('/', (req,res) => {
    Bug.find()
        .sort({priority: -1}) //get in descending error
        .then(bugs => res.json(bugs))
        .catch(err => res.status(404).json({sucess: false}));
});

//POST requests
router.post('/', (req,res) =>{
    const bug = new Bug({
        issue: req.body.issue,
        description: req.body.description,
        priority: req.body.priority
    });
    bug.save()
        .then(()=>res.json({success: true}))
        .catch(err => res.status(404).json({sucess: false}));
});

//DELETE requests
router.delete('/:id', (req,res) =>{
    Bug.findById(req.params.id)
        .then(bug =>bug.remove().then(()=>res.json({success: true})))
        .catch(err => res.status(404).json({sucess: false}));
})

//PUT (Update) requests
router.put('/:id', (req,res) =>{
    Bug.findById(req.params.id)
        .then(bug =>bug.update(req.body).then(()=>res.json({success: true})))
        .catch(err => res.status(404).json({sucess: false}));
});

//Exports
module.exports = router;