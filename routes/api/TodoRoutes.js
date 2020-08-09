const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');

const todo = require('../../models/TodoModel');

router.get(`/`,checkAuth , (req, res) => {
    const user_id = req.params.user_id;
    todo.find(user_id).then(todos => res.json({
        status: 200,
        todos
    }))
});


router.get('/:id', checkAuth ,(req, res) => {
    const id = req.params.id;
    todo.findById(id)
        .then(todo => {
            res.json({
                status: 200,
                todo
            })
        })
});

router.post('/', (req, res) => {
    const newTodo = new todo({
        user_id: req.body.user_id,
        todo_title: req.body.todo_title,
        todo_description: req.body.todo_description
    });

    newTodo.save().then(todo => {
        res.json({
            todo,
            status: 200,
            message: "Todo saved successfully"
        })
    })
    .catch((err) => {
        res.json(err)
    })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    todo.findById(id)
        .then(todo => 
            todo.remove().
                then(res.json({
                    status: 200,
                    message: 'Todo has successfully deleted'
                }).catch(err => {
                    res.json(err)
                })
        ))
        .catch(err => {
            res.json(err)
        })
})


module.exports = router;