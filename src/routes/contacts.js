const express = require("express");
const Contacts = require("../models/contacts.models");

const router = express.Router();


router.post("/contacts/create", async (req, res) => {
    try {
        let data = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            employedWith: req.body.employedWith,
            positionInOrg: req.body.positionInOrg,
            note: req.body.note
        }
        const newContact = await Contacts.create(data)
        res.status(200).json(newContact);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contacts.find({})
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router



