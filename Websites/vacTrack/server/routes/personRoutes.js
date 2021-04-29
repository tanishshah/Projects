//Variables 
const express = require('express');
const router = express.Router();
const Pers = require('../models/personModel');

//GET requests
router.get('/', (req,res) => {
    Person.find()
        .then(people => res.json(people))
        .catch(err => res.status(404).json({sucess: false}));
});

//POST requests
router.post('/', (req,res) =>{
    const individual = new Person({
        lattitude: req.body.lattitude,
        longitude: req.body.longitude,
        vaccinated: req.body.vaccinated,
        age: req.body.age,
        income: req.body.income,
        name: req.body.name,
        mail: req.body.mail
    });
    individual.save()
        .then(()=>res.json({success: true}))
        .catch(err => res.status(404).json({sucess: false}));
});

router.delete('/:id', (req,res) =>{
    Person.findById(req.params.id)
        .then(person =>person.remove().then(()=>res.json({success: true})))
        .catch(err => res.status(404).json({sucess: false}));
})

router.put('/:id', (req,res) =>{
    Person.findById(req.params.id)
        .then(person =>person.update(req.body).then(()=>res.json({success: true})))
        .catch(err => res.status(404).json({sucess: false}));
});


//Exports
module.exports = router;