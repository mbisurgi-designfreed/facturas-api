const mongoose = require('mongoose');
const isEmail = require('validator').isEmail;

const Schema = mongoose.Schema;

const CONDICION_IVA = ['ri', 'rs', 'cf', 'ex'];

const LocationSchema = new Schema({
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
});

const DomicilioSchema = new Schema({
    calle: {
        type: String,
        required: [true, 'Calle es requerido']
    },
    altura: {
        type: String
    },
    localidad: {
        type: String
    },
    codigoPostal: {
        type: String
    },
    geometry: {
        type: LocationSchema
    }
});

const ClienteSchema = new Schema({
    razonSocial: {
        type: String,
        required: [true, 'Razon social es requerido']
    },
    domicilio: {
        type: DomicilioSchema
    },
    cuit: {
        type: String
    },
    condicionIva: {
        type: String,
        required: true,
        default: 'cf',
        enum: CONDICION_IVA
    },
    telefono: {
        type: String
    },
    email: {
        type: String,
        validate: {
            validator: isEmail,
            message: '{VALUE} no es un email valido'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Cliente = mongoose.model('cliente', ClienteSchema, 'clientes');

module.exports = Cliente;