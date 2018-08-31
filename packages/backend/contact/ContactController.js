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
            return res.status(500).send("There was a problem adding the information to the database.");
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
            return res.status(500).send("There was a problem finding the contacts.");
        }

        let newContacts = [];

        if(req.query.classification) {
            if(req.query.classification === 'TOP SECRET') {
                // Return all contacts
                res.status(200).send(contacts);
            } else if(req.query.classification === 'SECRET') {

                contacts.forEach( (contact) => {
                    let newContact = filterContactNumbers(contact, req.query.classification);

                    if (newContact !== null) {
                        newContacts.push(newContact);
                    }
                });

                res.status(200).send(newContacts);

            } else if(req.query.classification === 'OFFICIAL') {

                contacts.forEach( (contact) => {
                    let newContact = filterContactNumbers(contact, req.query.classification);

                    if (newContact !== null) {
                        newContacts.push(newContact);
                    }
                });

                res.status(200).send(newContacts);

            } else {
                res.status(400).send("Unknown classification.");
            }

        } else {
            res.status(200).send(contacts);
        }
    }).sort({ name: 'asc'});
});

// GET - Returns a single Contact from the database
router.get('/:id', (req, res) => {

    Contact.findById(req.params.id, (err, contact) => {
        if (err) {
            return res.status(500).send("There was a problem finding the contact.");
        }

        if(req.query.classification) {

            if(req.query.classification === 'TOP SECRET' || 'SECRET' || 'OFFICIAL') {
                let newContact = filterContactNumbers(contact, req.query.classification);

                if (newContact !== null) {
                    res.status(200).send(newContact);
                } else {
                    // Don't return a contact with no numbers
                    res.status(404).send("Contact not found.")
                }
            } else {
                res.status(400).send("Unknown classification.");
            }
        } else {
            res.status(200).send(contact);
        }
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

function filterContactNumbers(contact, classification) {
    if(classification === 'TOP SECRET') {
        // Return all numbers
        return contact;
    } else if(classification === 'SECRET') {
        // Only return SECRET and OFFICIAL
        let newContact = {
            _id: contact._id,
            name: contact.name,
            numbers: []
        };

        contact.numbers.forEach( (number) => {
            if (number.classification !== 'TOP SECRET') {
                newContact.numbers.push(number);
            }
        });

        if (newContact.numbers.length === 0) {
            return null;
        } else {
            return newContact;
        }

    } else if(classification === 'OFFICIAL') {
        // Only return OFFICIAL
        let newContact = {
            _id: contact._id,
            name: contact.name,
            numbers: []
        };

        contact.numbers.forEach( (number) => {
            if (number.classification === 'OFFICIAL') {
                newContact.numbers.push(number);
            }
        });

        if (newContact.numbers.length === 0) {
            return null;
        } else {
            return newContact;
        }
    } else {
        // Unknown classification
        return null;
    }
};

module.exports = router;