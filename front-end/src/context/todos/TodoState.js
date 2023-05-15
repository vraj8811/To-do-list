import { useState } from "react";
import TodoContext from "./todoContext";

const TodoState = (props) => {
    const host = "http://localhost:5000"
    const todosInitial = []

    const [todos, setTodos] = useState(todosInitial)

    //get all tasks
    const gettodo = async () => {
        console.log("Adding task..")

        // API Call 
        const response = await fetch(`${host}/api/todos/fetchalltodos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        setTodos(json);
    }


    // Add a Note
    const addTodo = async (title, description, iscompleted) => {
        console.log("Adding task..")

        // API Call 
        const response = await fetch(`${host}/api/todos/addtodo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, iscompleted })
        });

        const todo = await response.json();
        setTodos(todos.concat(todo));
    }


    // Delete a Note
    const deleteTodo = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/todos/deletetodo/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = response.json();
        console.log(json);

        console.log("deleteing task with id..." + id)
        const newTodos = todos.filter((todo) => { return todo._id !== id })
        setTodos(newTodos);

    }


    // Edit a Note
    const editTodo = async (id, title, description, iscompleted) => {

        // API Call 
        const response = await fetch(`${host}/api/todos/updatetodo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, iscompleted })
        });

        const json = await response.json();
        console.log(json);
        console.log("backend..")
        console.log(iscompleted)

        let newTodos = JSON.parse(JSON.stringify(todos));
        for (let index = 0; index < newTodos.length; index++) {
            const element = newTodos[index];
            if (element._id === id) {
                newTodos[index].title = title;
                newTodos[index].description = description;
                newTodos[index].iscompleted = iscompleted;
                break;
            }
        }
        setTodos(newTodos);

        
    }


    return (
        <TodoContext.Provider value={{ todos, addTodo, deleteTodo, editTodo, gettodo }}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoState;