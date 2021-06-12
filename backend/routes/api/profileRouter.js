const express = require("express");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const Post = require("../../models/Posts");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const request = require("request");
const axios=require('axios')

//@route     GET api/profile/me
//@desc        Get current users profile
//@access      Private

router.get('/me', auth, async (req, res) => {
  
  try {
    const profile = await Profile.findOne({ contact: req.contact.id }).populate(
      "contact",
      ["name", "avatar"]
    );

    if (!profile) {
      res.status(400).json({ msg: "there is no profile for this contact!" });
    }
  
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//@route     POST api/profile
//@desc        CREATE or UPDATE a user profile
//@access      Private

router.post(
  "/",
  auth,
  [
    check("status", "status is required").not().isEmpty(),
    check("skills", "skills is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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

    //build profile object
    const profileFields = {};
    profileFields.contact = req.contact.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    //build a social object

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ contact: req.contact.id });
      if (profile) {
        //UPDATE
        profile = await Profile.findOneAndUpdate(
          { contact: req.contact.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //CREATE
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);
//@route     GET api/profile
//@desc        Get all profiles
//@access      Public

router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("contact", [
      "name",
      "avatar",
    ]);

    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//@route     GET api/profile/user/:user_id
//@desc        Get profile by user id v
//@access      Public

router.get("/contact/:contact_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      contact: req.params.contact_id,
    }).populate("contact", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found !" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found ! " });
    }
    res.status(500).send("Server Error");
  }
});

//@route     DELETE api/profile
//@desc        Delete profile,user & posts
//@access      Private

router.delete("/", auth, async (req, res) => {
  try {
    //Remove user posts
    await Post.deleteMany({contact:req.contact.id})
    // Delete profile
    await Profile.findOneAndRemove({ contact: req.contact.id });

    // Remove user
    await Profile.findOneAndRemove({ _id: req.contact.id });

    res.json({ msg: "User deleted !!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//@route     PUT api/profile/experience
//@desc        ADD profile experience
//@access      Private

router.put(
  "/experience",
  auth,
  [
    check("title", "Title is required").not().isEmpty(),
    check("company", "Company is required").not().isEmpty(),
    check("from", "From  date is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, location, from, to, current, description } =
      req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ contact: req.contact.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route     DELETE api/profile/experience/:exp_id
//@desc        DELETE experience from profile
//@access      Private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ contact: req.contact.id });
    //get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@route     PUT api/profile/experience
//@desc        ADD profile experience
//@access      Private

router.put(
  "/education",
  auth,
  [
    check("school", "Title is required").not().isEmpty(),
    check("degree", "Degree is required").not().isEmpty(),
    check("filedofstudy", "Filedofstudy is required").not().isEmpty(),
    check("from", "From  date is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      filedofstudy,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEduc = {
      school,
      degree,
      filedofstudy,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ contact: req.contact.id });
      profile.education.unshift(newEduc);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
//@route     DELETE api/profile/education/:educ_id
//@desc        DELETE experience from profile
//@access      Private

router.delete("/education/:educ_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ contact: req.contact.id });
    //get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.educ_id);

    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route     GET api/profile/github/:username
//@desc        Get user repositry from github
//@access      Public

router.get('/github/:username', async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUBCLIENTID}&client_secret=${process.env.GITHUBSECRET}`
    );
    const headers = {
      'user-agent': 'node.js',
    };

    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'No Github profile found' });
  }
});

module.exports = router;
