import React, { useContext, useEffect, useRef, useState } from 'react'
import todoContext from '../context/todos/todoContext';
import Todositem from './Todositem';
import AddTodo from './AddTodo';
import './todo.css'

export default function Todos(props) {
  const context = useContext(todoContext);
  const { todos, gettodo, editTodo } = context;
  const [todo, setTodo] = useState({ id: "", etitle: "", edescription: "", eiscompleted: false });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      gettodo();
    }
    else {
      window.location.href = '/login';
    }

  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateTodo = (currentTodo) => {
    ref.current.click();
    setTodo({ id: currentTodo._id, etitle: currentTodo.title, edescription: currentTodo.description, eiscompleted: currentTodo.iscompleted });
  }

  const handleClick = (e) => {
    console.log("Updating the task..", todo)
    editTodo(todo.id, todo.etitle, todo.edescription, todo.eiscompleted);
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");

  }

  const onChange = (e) => {
    if (e.target.name === "eiscompleted") {
      setTodo({ ...todo, [e.target.name]: e.target.value === "true" });
    } else {
      setTodo({ ...todo, [e.target.name]: e.target.value });
    }
  };





  return (
    <>
      <AddTodo showAlert={props.showAlert} />


      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={todo.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={todo.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="eiscompleted" className="form-label">Status</label>
                  <div className="form-check">
                    <input type="radio" className="form-check-input" id="completed" name="eiscompleted" value={true} checked={todo.eiscompleted === true} onChange={onChange} />
                    <label className="form-check-label" htmlFor="completed">Completed</label>
                  </div>
                  <div className="form-check">
                    <input type="radio" className="form-check-input" id="not-completed" name="eiscompleted" value={false} checked={todo.eiscompleted === false} onChange={onChange} />
                    <label className="form-check-label" htmlFor="not-completed">Panding</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={todo.etitle.length < 5 || todo.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Task</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2 style={{color:"white"}} className="text-center mb-4">Your Todo Task</h2>
        <div className="container mx-2">
          {todos.length === 0 && 'No Tasks to Display..!!'}
        </div>
        {todos.map((todo) => {
          return <Todositem key={todo._id} updateTodo={updateTodo} todo={todo} showAlert={props.showAlert} />;
        })}
      </div>
    </>
  )
}
