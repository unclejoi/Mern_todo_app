const _jwt = require('jsonwebtoken')
const secretKey = require('../config/keys').secret;

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];

    if(token){
        _jwt.verify(token, secretKey, (err, decoded) => {
            if(err){
                return res.json({
                    status: 401,
                    message: 'Unauthorized access'
                })
            }else{
                req.decoded = decoded;
                next()
            }
        })
    }else{
        res.json({
            status: 401,
            message: 'Unauthorized access'
        })
    }   
}