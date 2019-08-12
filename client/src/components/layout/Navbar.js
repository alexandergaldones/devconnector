import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'; //connect to redux bring in some auth state
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Dashboard from '../dashboard/Dashboard';

const Navbar = ({ auth : { isAuthenticated, loading }, logout}) => {

    const authLinks = (
        <ul>
            <li>
                <Link to="/dashboard" component={Dashboard}>
                    <i className="fas fa-user" />{' '}
                    <span className="hide-sm"></span>Dashboard
                </Link>
            </li>
            <li>
                <a onClick={logout} href="#!">
                <i className="fas fa-sign0out-alt">{' '}</i>
                <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to="#!">Developers</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );

    return (
    <nav className="navbar bg-dark">
        <h1> 
          <Link to="/">
              <i className="fas fa-code"></i> DevConnector
           </Link>
        </h1>
        { !loading && (<Fragment>  { (isAuthenticated ? authLinks : guestLinks ) }</Fragment>)}
      </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
