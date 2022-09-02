import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import hasPermission from "./../../../extraTs/utils/permissions";
import config from '../../config/configuration';

/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 */

const authMiddleWare = (moduleName, permissionType) => async (req, res , next) => {
  const key = config.secret;

  try {
    const token = req.headers.authorization;

    // verify request has token
    if (!token) {
      return res.status(401).json({ message: 'Invalid token ' });
    }

    jwt.verify(token, key, (err, user) => {
      // console.log(user);
      if(user && hasPermission(moduleName, user.role, permissionType)){
          next();
        } else {
          return res
            .status(403)
            .send({success: false, message: "Error, Permission doesn't exist"});
        }
    })
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Expired token' });
      return;
    }

    res.status(500).json({ message: 'Failed to authenticate user' });
  }
};

export default authMiddleWare;
