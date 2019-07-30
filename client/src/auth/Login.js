import React from 'react'

const Login = () => {

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
        if(password != password2) {
            console.log('Passwords do not match');
        } else {
            console.log('SUCCESS');

            /*
            * Saving in a traditional way... but we'll do it instead in redux action
            */
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
                const res = await axios.post('/api/users', body, config);
                console.log(res);
            }catch(err) {
                console.error(err.response.data);
            }
        }
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
          <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
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
            minLength="6"
            value={password} 
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            name="password2"
            value={password2} 
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </Fragment>
    
}

export default Login
