import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Navbar from "./component/Navbar";
import Home from './component/Home';
import About from './component/About';
import TodoState from './context/todos/TodoState';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import { useEffect, useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  
  useEffect(() => {
    const storedAlert = localStorage.getItem('alert');
    if (storedAlert) {
      setAlert(JSON.parse(storedAlert));
      localStorage.removeItem('alert');
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    }
  }, []);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <TodoState>
        <Router>
          <Navbar title="Todo List" />
          <Alert alert={alert} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert} />
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert} />
              </Route>
            </Switch>
          </div>
        </Router>
      </TodoState>
    </>
  );
}

export default App;
