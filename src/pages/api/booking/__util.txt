const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const randToken = require('rand-token');
import Token from '../token/Token.model';


export  const storeRefreshToken = async(refreshToken, user) =>  {
  const storedRefreshToken =   new Token({
  refreshToken,
  id:user.id  
})
await storedRefreshToken.save()
}
export const createToken = async user => {
  // Sign the JWT
  if (!user.role) {
    user.role = 'TALIB'
  }
  return jwt.sign(
    {
      id: user.id,
      login: user.login,
      role: user.role,
      iss: 'liismaiil',
      aud: 'liismaiil'
    },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn:'5s' }
  );
};

export const hashPassword = password => {
  return new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const verifyPassword = (
  passwordAttempt,
  hashedPassword
) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'There was a problem authorizing the request'
    });
  }
  if (req.user.role !== 'admin') {
    return res
      .status(401)
      .json({ message: 'Insufficient role' });
  }
  next();
};

export const getRefreshToken = () => {
  return randToken.uid(64);
};

export const oneWeek = 7 * 24 * 3600 * 1000;

export const getDatePlusOneWeek = () => {
  return new Date(new Date().valueOf() + oneWeek);
};
