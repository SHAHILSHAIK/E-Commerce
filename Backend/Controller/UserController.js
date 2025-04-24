const UserModel = require('../Model/User');
const bcrypt = require('bcrypt');

// Signup
const UserSignUp = async (req, res) => {
    const { UserName, UserEmail, UserPassword } = req.body;

    try {
        const userExists = await UserModel.findOne({ UserEmail });

        if (userExists) {
            return res.status(400).json({ message: 'User Already Exists' });
        }

        const HashedPassword = await bcrypt.hash(UserPassword, 10);

        const NewUser = new UserModel({
            UserName,
            UserEmail,
            UserPassword: HashedPassword
        });

        await NewUser.save();

        res.status(201).json({ message: "User Created Successfully" });

    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(500).json({ message: "Something went wrong. Try again later." });
    }
};

// Login
// Login
const UserLogin = async (req, res) => {
  const { UserEmail, UserPassword } = req.body;

  try {
    const userExists = await UserModel.findOne({ UserEmail });

    if (!userExists) {
      return res.status(400).json({ message: 'User Not Found' });
    }

    const isMatch = await bcrypt.compare(UserPassword, userExists.UserPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // Send back user data (excluding password)
    const { UserName, UserEmail: UserEmail } = userExists;

    res.status(200).json({
      message: "Login Successful",
      user: {
        name: UserName,
        email: UserEmail,
        image: "https://i.pravatar.cc/150?u=" + UserEmail // Just for demo, random avatar
      }
    });

  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Invalid email or password" });
  }
};


module.exports = { UserSignUp, UserLogin };
