const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator/check');

// @route       GET api/profile/me
// @desc        Get Current User's Profile
// @access      Private
router.get('/me', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }

        res.json(profile);

    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       POST api/profile
// @desc        Create or update a user's profile
// @access      Private
router.post('/', [ 
    auth,
    [
        check('status', 'Status is required')
            .not()
            .isEmpty(),
        check('skills', 'Skills is required')
            .not()
            .isEmpty()
    ]
 ], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ erros: errors.array() });
    }
    
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
    } = req.body;

    // Build Profile objects
    const profileFields = {};
    profileFields.user = req.user.id;

    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    //if(skills) profileFields.skill = skills;

    // Build Social object
    profileFields.social = {};

    if(youtube) profileFields.social.youtube = youtube;
    if(facebook) profileFields.social.facebook = facebook;
    if(twitter) profileFields.social.twitter = twitter;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkedin) profileFields.social.linkedin = linkedin;

    if(skills) {
        profileFields.skills = skills.split(',').map( skill => skill.trim());
    }

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if(profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
                );

            return res.json(profile);
        }
        // Create new Profile
        profile = new Profile(profileFields);
        await profile.save();

        res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


// @route       GET /api/profile
// @description Get all profiles
// @access      Public 
router.get('/', async (req, res) => {
    try {
        let profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route       GET /api/profile/user/:user_id
// @description Get profile by user id
// @access      Public 
router.get('/user/:user_id', async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        
        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user '});
        }

        res.json(profile);

    } catch(err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'There is no profile for this user '});
        }
        res.status(500).send('Server Error');
    }
});

// @route       DELETE api/profile
// @desc        Delete Prfoile, user & post
// @access      Private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove profile
        await Profile.findOneAndRemove( { user: req.user.id });
        await User.findOneAndRemove( { _id: req.user.id });

        res.json({ msg: 'User deleted'});

    }catch(err) {
        console.err(err.message);
        return res.status(500).send('Server Error');
    }
});

// @route       PUT api/profile
// @desc        Update User Profile
// @access      Private
router.put('/experience', [ 
    auth,
    [
        check('title', 'Title is required')
        .not()
        .isEmpty(),
        check('company', 'Company is Required')
        .not()
        .isEmpty(),
        check('from', 'From Date is required')
        .not()
        .isEmpty()
    ]
    ], async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        const profile = await Profile.findOne({ user: req.user_id });
        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('SEnd Error');
    }
});

module.exports = router;