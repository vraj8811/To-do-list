const express = require('express')
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'vrajisagoodcooder';


//create a user using : POST "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'Enter Valid Name..(atleast 3 characters)!!').isLength({ min: 3 }),
    body('username', 'Enter Valid Username..(atleast 5 characters)!!').isLength({ min: 5 }),
    body('password', 'Enter Valid password..(atleast 5 characters)!!').isLength({ min: 5 })
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ username: req.body.username });
        // console.log(user);
        if (user) {
            return res.status(400).json({success, error: "Sorry user with this username already exists..!!" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            username: req.body.username,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);


        // res.json(user)
        success=true;
        res.json({success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

    //   .then(user => res.json(user))
    //   .catch(err=> {console.log(err)
    //     res.json({error: 'Please enter a unique valid username..!',message : err.message})
    // })
})


//authenticate a user using : POST "/api/auth/login"

router.post('/login', [
    body('username', 'Enter a valid username').isLength({ min: 5 }),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


});

// Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

module.exports = router;