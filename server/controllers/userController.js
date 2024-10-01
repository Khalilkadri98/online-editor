const User = require("../models/User");
const CodeFile = require("../models/CodeFile");
const Code = require("../models/Code");
const jwt = require("jsonwebtoken");

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
    return res
      .status(400)
      .json({
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

    // Create a new user
    const user = new User({
      email,
      password, 
      username,
      gender,
      phoneNumber,
      company,
      yearsOfExperience,
    });
    await user.save();
    res.status(201).send("User created");
  } catch (err) {
    res.status(500).send(err.message);
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

    if (password !== user.password) {
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

module.exports = {
  register,
  verifyUsers,
  login,
  saveCode,
  loadCode,
};
