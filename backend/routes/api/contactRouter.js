const express = require("express");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const Contact = require("../../models/Contact");
const router = express.Router();
//@route     GET api/contacts
//@desc        Register user
//@access       Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("lastName", "LastName is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, lastName, email, password } = req.body;
    try {
      // see if the user exist
      let contact = await Contact.findOne({ email });

      if (contact) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists !!" }] });
      }
      //get users gavatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      contact = new Contact({
        name,
        lastName,
        email,
        password,
        avatar,
      });
      // encrypt password
      const salt = await bcrypt.genSalt(10);
      contact.password = await bcrypt.hash(password, salt);
      await contact.save();
      // return token
      const payload = {
        contact: {
          id: contact.id,
        },
      };
      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if(err)throw err;
          res.send({token})
        }
      );


    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
