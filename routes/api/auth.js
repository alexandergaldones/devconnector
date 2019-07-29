const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route       GET api/auth
// @desc        Auth Route
// @access      Public
router.get('/', auth, async (req,res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    res.send('Auth Route');
});


// @route       POST api/auth
// @desc        Authenticate User and get token
// @access      Public
router.post('/', [
    check('email', 'Please enter a valid email')
        .isEmail(),
    check('password', 'Password is required')
        .exists()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    try {

        let user = await User.findOne({ email });

        // See if the user exists

        if(!user) {
            return res.status(400).json({ errors: [ { msg: 'Invalid credentials'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ errors: [ { msg: 'Invalid credentials'}]});
        }
    
        // Return the json web token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );

        //res.send('User registered');
    } catch(error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
    //res.send('Users Route');
});

module.exports = router;