const AdminModel = require('../Model/Admin');
const bcrypt = require('bcrypt');

const AdminSignUp = async (req, res) => {
  const { AdminName, AdminPassword, AdminEmail } = req.body;

  try {
    const AdminExists = await AdminModel.findOne({ AdminEmail });

    if (AdminExists) {
      return res.status(400).json({ message: "Admin already exists!" });
    }

    const HashedPassword = await bcrypt.hash(AdminPassword, 10);

    const NewAdmin = new AdminModel({
      AdminName,
      AdminEmail,
      AdminPassword: HashedPassword,
    });

    await NewAdmin.save();

    res.status(200).json({ message: "Admin created successfully!" });
  } catch (error) {
    console.error("SignUp Error", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const AdminLogin = async (req, res) => {
  const { AdminEmail, AdminPassword } = req.body;

  try {
    const AdminExists = await AdminModel.findOne({ AdminEmail });

    if (!AdminExists) {
      return res.status(400).json({ message: "Admin Not Found" });
    }

    const isValid = await bcrypt.compare(AdminPassword, AdminExists.AdminPassword);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // Optionally exclude password from response
    

    return res.status(200).json({ message: "Login Successfully"});
  } catch (error) {
    console.error("Login Error", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = { AdminLogin, AdminSignUp };
