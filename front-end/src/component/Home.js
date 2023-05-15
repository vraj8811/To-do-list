import React from 'react'
import Todos from './Todos';

const Home = (props) => {
 const {showAlert} = props;
  return (
    <div>
      <Todos showAlert={showAlert} />
    </div>
  )
}

export default Home
