// token validator middleware

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const tokenValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // get token from header
  const token = req.header("auth");

  // check if token exists
  if (!token) {
    res.status(401).json({ msg: "token not found" });
    return;
  }

  // verify token
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "");
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
    return;
  }

  next();
};
