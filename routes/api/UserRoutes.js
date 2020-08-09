const express = require('express');
const router = express.Router();
const _bcrypt = require('bcrypt');


//User model;
const user = require('../../models/Users');

router.get('/', (req, res) => {
     user.find()
        .sort({ name: -1})
        .then(users => {
            res.json({
                status: 200,
                users
            })
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.id)
    user.findById(id)
        .then(user => {
            console.log(user)
            res.json({
                user,
                status: 200,
            })
        }).catch(err => {
            res.json(err)
        })
})

router.post('/', (req, res) => {

    _bcrypt.hash(req.body.password , 10, (err, hash) => {
        if(err){
            res.status(500).send(err);
        }else{
            const newUser = new user({
                first_name: req.body.first_name,
                middle_name: req.body.middle_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: hash
            });
            newUser.save().then(user => res.json({
                user,
                status: 200,
                message: 'User saved successfully'
            })).catch(err => {
                res.json(err)
            })
        }
    })
});

router.delete('/:id', (req, res) => {
    user.findById(req.params.id).then(user => {
        user.remove().then(() => res.json({
            status: 200,
            message: `User with a name of ${user.first_name} has been removed from the database successfully`
        })).catch((err) => {
            res.json(err)
        })
    }).catch(err => {
        res.json(err)
    })
})



module.exports = router;