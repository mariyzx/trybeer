import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Register from './pages/Register';
import Products from './pages/products';
import Admin from './pages/Admin';

function App() {
  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Products } />
      <Route path="/admin/manage" component={ Admin } />
    </Switch>
  );
}

export default App;
