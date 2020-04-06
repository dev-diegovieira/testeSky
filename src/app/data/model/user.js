const mongoose = require('./../../../configs/mongo');
const bcrypt = require('bcryptjs');

const UserPhoneSchema = new mongoose.Schema({
    ddd: String,
    numero: String
})

const UserSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: true
    },
    telefones: [UserPhoneSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    token: {
        type: String
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;