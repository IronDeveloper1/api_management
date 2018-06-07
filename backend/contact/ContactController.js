var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

var Contact = require('./Contact');

// POST - Create a new Contact
router.post('/', (req, res) => {

    Contact.create({
        name: req.body.name,
        numbers: req.body.numbers
    },
    (err, contact) => {
        if (err) {
            return res.status(500).send("There was a porblem adding the information to the database.");
        }
        res.status(200).send(contact);
    });
});

// PUT - Updates a single Contact in the database
router.put("/:id", (req, res) => {

    Contact.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, contact) => {
        if (err) {
            return res.status(500).send("There was a problem updating the contact.");
        }
        res.status(200).send(contact);
    });
});

// GET - Returns all Contacts in the database
router.get('/', (req, res) => {

    Contact.find({}, (err, contacts) => {
        if (err) {
            return res.status(500).send("There was a problem finding the users.");
        }
        res.status(200).send(contacts);
    });
});

// GET - Returns a single Contact from the database
router.get('/:id', (req, res) => {

    Contact.findById(req.params.id, (err, contact) => {
        if (err) {
            return res.status(500).send("There was a problem finding the contact.");
        }
        res.status(200).send(contact);
    });
});

// DELETE - Deletes a contact from the database
router.delete('/:id', (req, res) => {

    Contact.findByIdAndRemove(req.params.id, (err, contact) => {
        if (err) {
            return res.status(500).send("There was a problem deleting the contact.");
        }
        res.status(200).send("Contact " + contact.name + " was deleted.");
    });
});

module.exports = router;