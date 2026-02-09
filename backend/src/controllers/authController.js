import User from '../models/User.js';
import Flat from '../models/Flat.js';
import generateToken from '../utils/generateToken.js';

// Register
const register = async (req, res) => {
  try {
    const { username, email, password, flatCode } = req.body;

    // Validation
    if (!username || !email || !password || !flatCode) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      flatCode,
    });

    // Add user to flat
    let flat = await Flat.findOne({ flatCode });
    if (!flat) {
      flat = await Flat.create({
        flatCode,
        flatName: `Flat-${flatCode}`,
        members: [user._id],
      });
    } else {
      await Flat.findByIdAndUpdate(
        flat._id,
        { $push: { members: user._id } },
        { new: true }
      );
    }

    const token = generateToken(user._id, user.flatCode);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        flatCode: user.flatCode,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.flatCode);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        flatCode: user.flatCode,
        karma: user.karma,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current user
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('complaintsFiled');
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { register, login, getCurrentUser };
