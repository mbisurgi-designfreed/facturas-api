const Cliente = require('../models/cliente.model');

exports.list = async (req, res, next) => {
    try {
        const clientes = await Cliente.find({ user: req.user._id });

        res.status(200).send({ clientes });
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const cliente = await Cliente.findOne({ _id: id, user: req.user._id });

        res.status(200).send({ cliente });
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.insert = async (req, res, next) => {
    try {
        const cliente = await new Cliente({ ...req.body, user: req.user._id }).save();

        res.status(201).send({ cliente });
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;

        const cliente = await Cliente.findOneAndUpdate({ _id: id, user: req.user._id }, { $set: req.body }, { new: true });

        res.status(200).send({ cliente });
    } catch (err) {
        res.status(422).send({ err });
    }
}