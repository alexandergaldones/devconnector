import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import getCurrentProfile from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth, profile  }) => {

    //useEffect(() => {
    //    getCurrentProfile();
    //});

    return (
        <div>Dashboard</div>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);



/*
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCurrentProfile from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth, profile }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return (
        <h1>Dashboard</h1>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.array.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
*/