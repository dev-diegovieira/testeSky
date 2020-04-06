const jwt = require('jsonwebtoken');
const authConfig = require('./../../configs/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({
            mensagem: 'Token necessário'    
        });

    const parts = authHeader.split(' ');
    const [ scheme, token ] = parts;

    if ((!parts.length === 2) || (scheme != 'Bearer'))
        return res.status(401).send({
            mensagem: 'Bearer token inválido.'    
        }); 

    
    jwt.verify(token, authConfig.secret, (err, decoded) => {        
        if (err) return res.status(500).send({
            mensagem: 'Token não registrado.'    
        });  
        
        req.email = decoded.id;
        return next();
    });
}