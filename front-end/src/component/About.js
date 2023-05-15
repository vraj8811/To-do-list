import React from 'react';

const About = () => {
  return (
    <div className="container" style={{color:"white"}}>
      <div className="row">
        <div className="col">
          <h2 style={{color:'white'}}>About Us</h2>
          <p>
            Welcome to my Todo List application! I am very passionate about productivity and helping you stay organized.
          </p>
          <p>
            My mission is to provide you with a simple and intuitive tool to manage your tasks effectively. Whether you're a student, a professional, or anyone looking to stay on top of their to-do list, my application is designed to make your life easier.
          </p>
          <p>
            With my Todo List app, you can create tasks, set deadlines, prioritize your work, and mark tasks as completed. Stay focused, track your progress, and achieve your goals effortlessly.
          </p>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <h3>Devloper Info.</h3>
          <p>
            Student Info.
          </p>
          <ul>
            <li>Name : Vraj Patel</li>
            <li>SID : 202212078</li>
            <li>Course : M.sc It 2nd Sem</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
