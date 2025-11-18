import { Request, Response, NextFunction } from 'express';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

// Extend Express Request to include user info
export interface AuthenticatedRequest extends Request {
  user?: {
    sub: string;          // Cognito user ID
    email: string;
    name?: string;
    tokenUse: string;
  };
}

// Create JWT verifier for Cognito
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID!,
  tokenUse: 'id',  // Use 'id' token (contains user attributes)
  clientId: process.env.COGNITO_CLIENT_ID!,
});

/**
 * Middleware to authenticate requests using Cognito JWT
 */
export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'No authorization header provided',
      });
      return;
    }

    // Check Bearer format
    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid authorization format. Use: Bearer <token>',
      });
      return;
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'No token provided',
      });
      return;
    }

    // Verify token with Cognito
    const payload = await verifier.verify(token);

    // Add user info to request
    req.user = {
      sub: payload.sub,
      email: payload.email as string,
      name: payload.name as string | undefined,
      tokenUse: payload.token_use,
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired token',
    });
  }
};

/**
 * Optional auth middleware - doesn't fail if no token
 * Useful for routes that work with or without authentication
 */
export const optionalAuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      
      if (token) {
        const payload = await verifier.verify(token);
        
        req.user = {
          sub: payload.sub,
          email: payload.email as string,
          name: payload.name as string | undefined,
          tokenUse: payload.token_use,
        };
      }
    }

    next();
  } catch (error) {
    // Token invalid but we continue without user
    console.warn('Optional auth failed:', error);
    next();
  }
};