import jwt from 'jsonwebtoken';

/**
 * Generates a JSON Web Token (JWT) for a given user ID.
 * @param {string} id - The user's unique ID to be included in the token payload.
 * @returns {string} The generated JWT.
 */
const generateToken = (id) => {
  // Sign the token with the user ID and the secret key from your .env file
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // Set the token to expire in 30 days
    expiresIn: '30d',
  });
};

export default generateToken;