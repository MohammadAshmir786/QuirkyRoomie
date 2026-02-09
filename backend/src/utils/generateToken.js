import jwt from 'jsonwebtoken';

const generateToken = (userId, flatCode) => {
  return jwt.sign(
    { userId, flatCode },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

export default generateToken;
  