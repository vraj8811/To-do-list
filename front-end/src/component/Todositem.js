import React, { useContext } from 'react'
import todoContext from '../context/todos/todoContext';

const Todositem = (props) => {
  const context = useContext(todoContext);
  const {deleteTodo} = context;
  const {todo,updateTodo} = props;
  const cardClass = todo.iscompleted ? 'card my-3 bg-success' : 'card my-3';
  return (
    <div className="col-md-3">
            <div className={cardClass}>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{todo.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteTodo(todo._id);
                            props.showAlert("Deleted Successfully","success");
                        }}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateTodo(todo)}}></i>
                    </div>
                    <p className="card-text">{todo.description}</p>

                </div>
            </div>
        </div>
  )
}

export default Todositem
