const User = require("../models/User");
const CodeFile = require("../models/CodeFile");
const Code = require("../models/Code");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid'); // For generating a unique token

const {
  sendVerificationEmail,
  sendForgotPasswordEmail,
} = require("../utils/emailService");

const register = async (req, res) => {
  const {
    email,
    password,
    username,
    gender,
    phoneNumber,
    company,
    yearsOfExperience,
  } = req.body;

  // Validate required fields
  if (
    !email ||
    !password ||
    !username ||
    !gender ||
    !phoneNumber ||
    yearsOfExperience == null
  ) {
    return res.status(400).json({
      message:
        "Email, password, username, gender, phone number, and years of experience are required",
    });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Get the current date
    const currentDate = new Date();

    // Create a new user
    const user = new User({
      email,
      password, //: hashedPassword,
      username,
      gender,
      phoneNumber,
      company,
      yearsOfExperience,
      inscriptionDate: currentDate,
    });

    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send verification email
    await sendVerificationEmail(email, token);

    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Error during registration:", err);

    if (err.name === "ValidationError") {
      const errorMessages = Object.values(err.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ message: "Validation Error", errors: errorMessages });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
// Verify newly registered user
const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user by ID
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already verified
    if (user.verified) {
      return res.redirect('http://localhost:3000/login?message=Email already verified');
    }

    // Verify the user
    user.verified = true;
    await user.save();

    // Redirect to login with success message
    res.redirect('http://localhost:3000/login?message=Email verified successfully');
  } catch (err) {
    console.error("Error verifying email:", err);

    // Check if the error is related to token verification
    if (err.name === 'TokenExpiredError') {
      return res.redirect('http://localhost:3000/login?message=Verification link has expired');
    } else if (err.name === 'JsonWebTokenError') {
      return res.redirect('http://localhost:3000/login?message=Invalid verification link');
    }

    // General error response
    res.redirect('http://localhost:3000/login?message=Internal server error');
  }
};



const verifyUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("Users in database:", users);
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login request received:", { email, password });

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!user.verified) {
      return res.status(400).json({ message: "Please verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const { username, gender, phoneNumber, company, yearsOfExperience } =
    req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username || user.username;
    user.gender = gender || user.gender;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.company = company || user.company;
    user.yearsOfExperience =
      yearsOfExperience !== undefined
        ? yearsOfExperience
        : user.yearsOfExperience;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
/*const saveFiles= async (req, res) => {
    const { files } = req.body;
    const userId = req.user.id;
  
    if (!files || !Array.isArray(files)) {
      console.log('No files data provided or data is not an array'); // Log
      return res.status(400).json({ message: 'No files data provided or data is not an array' });
    }
  
    try {
      console.log('User ID:', userId); // Log
      console.log('Files to save:', files); // Log
  
      let codeFile = await CodeFile.findOne({ userId });
  
      if (codeFile) {
        console.log('Existing code file found:', codeFile); // Log
        codeFile.files = files;
      } else {
        console.log('No existing code file, creating new'); // Log
        codeFile = new CodeFile({ userId, files });
      }
  
      await codeFile.save();
      console.log('Files saved successfully'); // Log
      res.status(200).json({ message: 'Files saved successfully' });
    } catch (err) {
      console.error('Error saving files:', err);
      res.status(500).send('Error saving files');
    }
  };

  const loadFiles= async (req, res) => {
    try {
      const userId = req.user.id;
      const codeFile = await CodeFile.findOne({ userId });
  
      if (!codeFile) {
        return res.status(404).json({ message: 'No files found for this user.' });
      }
  
      res.json({ files: codeFile.files });
    } catch (error) {
      console.error('Error fetching files:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };*/
  //handle saving code
const saveCode = async (req, res) => {
  const { title, code, language } = req.body;
  const userId = req.user.id; // Get the user ID from the auth middleware

  if (!title || !code || !language) {
    return res
      .status(400)
      .json({ message: "Title, code, and language are required" });
  }

  try {
    // Find and update the existing code, or create a new one if it doesn't exist
    const updatedCode = await Code.findOneAndUpdate(
      { user: userId, title, language },
      { code },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({ message: "Code saved successfully" });
    console.log("Request body:", req.body);
  } catch (err) {
    console.error("Error saving code:", err.message);
    res.status(500).json({ message: "Error saving code" });
  }
};
// handle loading saved code
const loadCode = async (req, res) => {
  const userId = req.user.id; // Get the user ID from the auth middleware

  try {
    // Find all code snippets for the user
    const codeFiles = await Code.find({ user: userId });

    if (!codeFiles || codeFiles.length === 0) {
      return res
        .status(404)
        .json({ message: "No saved code found for this user." });
    }

    res.status(200).json(codeFiles); // Return the code snippets
  } catch (err) {
    console.error("Error fetching saved code:", err);
    res.status(500).json({ message: "Error fetching saved code" });
  }
};
// handle Forgot Password + sending email
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Generate a unique token and hash it
      const rawToken = uuidv4();
      const hashedToken = await bcrypt.hash(rawToken, 10);

      // Store hashed token and expiration in the user model
      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpires = Date.now() + 10800000; // 3-hour expiry
      await user.save();

      // Send the email with the raw token (not hashed)
      await sendForgotPasswordEmail(email, rawToken);

      res.json({ message: 'Password reset email sent' });
  } catch (error) {
      console.error("Error in forgot password:", error);
      res.status(500).json({ error: 'Error processing request' });
  }
};
//handle reseting password
const resetPassword = async (req, res) => {
  const { token, email, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Check if the token has expired
    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Compare the provided token with the stored hashed token
    const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isTokenValid) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ error: 'Error processing request' });
  }
};




module.exports = {
  register,
  verifyUsers,
  login,
  getUserProfile,
  updateUserProfile,
  saveCode,
  loadCode,
  verifyEmail,
  forgotPassword,
  resetPassword
};
