import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './auth/Login';
import Register from './auth/Register';
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard';

//Redux
import { Provider } from 'react-redux'; // connects react and redux
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';


if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => { //it will keep on running like a constant loop 
    store.dispatch(loadUser());

    return () => {
      //cleanup
    };
  }, []); // empty bracket will only run once -- it's like a componentdidmount function

  // useEffect hook
  return (
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
              <Route exact path="/dashboard" component={Dashboard}></Route>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )}
export default App;