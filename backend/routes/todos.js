const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Todos = require('../models/Todo')
const { body, validationResult } = require('express-validator');


//Get All the todos using: GET "/api/todos/getuser". Login required
router.get('/fetchalltodos', fetchuser, async (req, res) => {
    try {
        const todos = await Todos.find({ user: req.user.id });
        res.json(todos)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// Add a new todo using: POST "/api/todos/addtodo". Login required
router.post('/addtodo', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, iscompleted } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const todo = new Todos({
                title, description, iscompleted, user: req.user.id
            })
            const savedTodo = await todo.save()

            res.json(savedTodo)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })



//Update an existing todo using: PUT "/api/todos/updatetodo". Login required
router.put('/updatetodo/:id', fetchuser, async (req, res) => {
    const { title, description, iscompleted } = req.body;
    try {
        // Create a newNote object
        const newTodo = {};
        if (title) { newTodo.title = title };
        if (description) { newTodo.description = description };
        if (iscompleted) { newTodo.iscompleted = iscompleted };

        // Find the note to be updated and update it
        let todo = await Todos.findById(req.params.id);
        if (!todo) { return res.status(404).send("Not Found") }

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        todo = await Todos.findByIdAndUpdate(req.params.id, { $set: newTodo }, { new: true })
        res.json({ todo });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Delete an existing todo using: DELETE "/api/todos/deletetodo". Login required
router.delete('/deletetodo/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let todo = await Todos.findById(req.params.id);
        if (!todo) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        todo = await Todos.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Todo has been deleted", todo: todo });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;