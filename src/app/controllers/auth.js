const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authConfig = require('../../configs/auth');
const UserData = require('./../data/user');

function generateToken(email) {
    return jwt.sign({id: email}, authConfig.secret, {
        expiresIn: process.env.SESSION_TIMEOUT
    });
};

router.post('/register', async (req, res) => {
    try {
        const userData = new UserData();

        if (!req.body.email) 
            return res.status(400).send({mensagem: 'Requisição inválida'});

        const filter = {email: req.body.email};

        if (await userData.get(filter))
            return res.status(400).send({mensagem: 'O usuário informado já existe!'});

        const lastLogin = new Date;
        const token = generateToken(filter);
        const user = await userData.insert({...req.body, lastLogin, token});        
        user.senha = undefined;

        return res.send(user);
    } catch(err) {
        return res.status(400).send({mensagem: err.message});
    }
});

router.post('/authenticate', async (req, res) => {
    console.log('SESSION_TIMEOUT', process.env.SESSION_TIMEOUT);
    if (!req.body.email ||!req.body.senha || !req.body.email.length || !req.body.senha.length)
        return res.status(400).send({mensagem: 'Requisição inválida'});    

    try {
        const userData  = new UserData();
        const lastLogin = new Date;
        const filter    = {email: req.body.email};
        const token     = generateToken(filter);
        let user = await userData.get(filter);
        console.log("user", user)

        if (!user) 
            return res.status(400).send({mensagem: 'O usuário informado não existe.'})

        if (!await bcrypt.compare(req.body.senha, user[0].senha))
            return res.status(400).send({mensagem: 'Senha inválida.'});
        console.log('3');
        user = await userData.udpate(filter, {lastLogin, token});
        user.senha = undefined;


        return res.send(user);

    } catch(err) {
        const { message } = err;
        console.log(err);
        return res.status(400).send(message);
    }
})

module.exports = app => app.use('/auth', router);