import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './auth/Login';
import Register from './auth/Register';
import Alert from './components/layout/Alert'
//Redux
import { Provider } from 'react-redux'; // connects react and redux
import store from './store';

const App = () => 
<Provider store={store}>
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>
        </Switch>
      </section>
    </Fragment>
  </Router>
</Provider>

export default App;