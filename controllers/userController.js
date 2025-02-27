const asynchandler = require("express-async-handler");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// -------- register logic ----------

const registerUser = asynchandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //---- Hash Password----
  const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(`User created ${user}`);
    if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }
    res.json({ message: "Register the user" });
});

// -------- login logic ----------
const loginUser = asynchandler(async (req, res) => {
     const { email, password } = req.body;
     if (!email || !password) {
       res.status(400);
       throw new Error("All fields are mandatory!");
     }
    const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
          {
            user: {
              username: user.username,
              email: user.email,
              id: user.id,
            },
          },
          process.env.ACCESS_TOKEN_SECERT,
    
          { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken });
      } else {
        res.status(401);
        throw new Error("email or password is not valid");
      }

  res.send(" login user ");
});

// -------- current user logic ----------
const currentUser = asynchandler(async (req, res) => {
  res.send(" current user ");
});

module.exports = { registerUser, loginUser, currentUser };
