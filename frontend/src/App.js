// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChatRoom from './pages/ChatRoom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import './theme.css'; // Import theme for styling

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is rendered on every page */}
      <Switch>
        <Route path="/chatroom" component={ChatRoom} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" exact component={Login} /> {/* Default route */}
      </Switch>
    </Router>
  );
}

export default App;
