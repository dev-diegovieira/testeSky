const express = require('express');
const authentication = require('../middlewares/auth');
const UserData = require('./../data/user');
const router  = express.Router();

router.use(authentication);

router.get('/', async (req, res) => {  
    try {
        const userDB = new UserData();  
        return  res.send( await userDB.get(req.query) );
    } catch(err) {
        const { message } = err;
        console.log(err);
        return res.status(400).send(message);
    }
});

router.post('/', async (req, res) => {  
    try {
        const userDB = new UserData();  
        
        if (!req.body.email) 
            return res.status(400).send({mensagem: 'Requisição inválida'});

        const filter = {email: req.body.email};

        if (await userData.get(filter))
            return res.status(400).send({mensagem: 'O usuário informado já existe!'});

        const user = await userDB.insert(req.body);        
        user.senha = undefined;

        return res.send(user);
    } catch(err) {
        const { message } = err;
        console.log(err);
        return res.status(400).send(message);
    }
});

router.put('/', async (req, res) => {  
    try {
        const userDB = new UserData();  
        if (!req.body[0].email) {
            return res.status(400).send({mensagem: 'Requisição inválida'});
        } 


                
        const filter = {email: req.body[0].email};

        const user = await userDB.udpate(filter, req.body[0], true);        
        user.senha = undefined;

        return res.send(user);
    } catch(err) {
        const { message } = err;
        console.log(err);
        return res.status(400).send(message);
    }
});

router.delete('/', async (req, res) => {  
    try {
        const userDB = new UserData();  
        
        if (!req.body.email) 
            return res.status(400).send({mensagem: 'Requisição inválida'});

        const filter = {email: req.body.email};

        const user = await userDB.udpate(filter, req.body, true);        
        user.senha = undefined;

        return res.send(user);
    } catch(err) {
        const { message } = err;
        console.log(err);
        return res.status(400).send(message);
    }
});

module.exports = app => app.use('/user', router);