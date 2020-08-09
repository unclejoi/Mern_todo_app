const express = require('express');
const router = express.Router();
const _bcrypt = require('bcrypt');
const _jwt = require('jsonwebtoken');
const secretKey = require('../../config/keys').secret;

//User model;
const user = require('../../models/Users');

router.post('/', (req, res) => {
    const { username, password } = req.body;

    user.findOne({ username: username}).then(user => {
        console.log(user)
        const match = _bcrypt.compare(password, user.password);
        if(match) {
            console.log(match)
            const t0ken = _jwt.sign({
                username: username},
                secretKey,
                { expiresIn: '24h'}
            );
            res.json({
                status: 200,
                message: 'Login Success',
                token: t0ken
            })
        }else{
            res.json({
                status: 400,
                message: 'Invalid Username or Password'
            })
        }
    }).catch(err => {
        res.json(err)
    })

})


module.exports = router;