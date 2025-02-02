import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || '';
console.log(process.env.JWT_SECRET);
const expiration = '2h';

export const AuthenticationError = new GraphQLError('Could not authenticate user.', {
  extensions: {
    code: 'UNAUTHENTICATED',
  },
});

export const authMiddleware = function ({ req }) {
  // Allow token from multiple sources
  let token = req.body.token || req.query.token || req.headers.authorization;

  // Clean up Bearer token
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    // Verify token and attach user data to request
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log('Invalid token!');
    throw new AuthenticationError('Invalid token!');
  }

  return req;
};

export const signToken = function ({ firstName, email, _id }) {
  const payload = { firstName, email, _id };
  
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};