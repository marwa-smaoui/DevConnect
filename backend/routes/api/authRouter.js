const express = require("express");
const auth = require("../../middleware/auth");
const Contact = require("../../models/Contact");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const router = express.Router();
//@route     GET api/auth
//@desc        Test route
//@access       Public
router.get("/", auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.contact.id).select('-password')
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//@route     POST api/auth
//@desc        authenticate user && get token
//@access       Public
router.post(
  '/',[
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),]
  ,async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // see if the user exist
      let contact = await Contact.findOne({ email });

      if (!contact) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, contact.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }


      const payload = {
        contact: {
          id: contact.id
        }
      };

      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }

      ); 
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);
module.exports = router;
