import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginForm from './pages/login/loginForm';
import Home from './pages/home/home';


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LoginForm} />
      <Route path="/home" component={Home} />
    </BrowserRouter>
  );
}

export default App;
