import React, { useContext, useState } from 'react'
import todoContext from '../context/todos/todoContext';


const AddTodo = (props) => {
    const context = useContext(todoContext)
  const {addTodo } = context;
  const[todo,setTodo] = useState({title:"",description:"",iscompleted:false});

    const handleClick = (e) => {
        e.preventDefault();
        addTodo(todo.title, todo.description);
        setTodo({title:"",description:"",iscompleted:""});
        props.showAlert("Added Successfully","success");

    }

    const onChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-3">
            <h2 style={{color:"white"}} className="text-center mb-4">Add Task</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label" style={{color:"white"}}>Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={todo.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label" style={{color:"white"}}>Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={todo.description} onChange={onChange} minLength={5} required />
                </div>
               
                <button disabled={todo.title.length<5 || todo.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Task</button>
            </form>
        </div>
    )
}

export default AddTodo
