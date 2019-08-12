import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux'; //pass component states to redux
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import PropTypes from 'prop-types';


const Register = ({setAlert, register, isAuthenticated}) => { // de-structure const Register = props =>

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData; // state hook

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            console.log('SUCCESS');
            register({name, email, password});
            /*
            * Saving in a traditional way... but we'll do it instead in redux action
            */
           /*
            const newUser = {
                name,
                email,
                password
            };

            try {
                const config = {
                    headers: {
                        'Content-type': 'Application/json'
                    }
                };

                const body = JSON.stringify(newUser);
                //const res = await axios.post('/api/users', body, config);
                //console.log(res);
            }catch(err) {
                console.log(err.response.data);
            }
            */
        }
    }

    // redirect if logged-in
    if(isAuthenticated) {
      return (
        <Redirect to="/dashboard" />
      );
    }

    /*
    == formData na
    state = {
        formData: {

        }
    }
    */

    // this.setState = {} setFormData

    return <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)}  />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)}  />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} 
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            name="password2"
            value={password2} 
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired, //ptfr es7 react redux ES7
  register: PropTypes.func.isRequired
};

const mapStatePros = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

// (props, { action })
export default connect(mapStatePros, { setAlert, register })(Register);
