import { Request, Response } from "express";
import { User } from "../models/user.model";
import { generateToken } from "../utils/generateToken";
import bcrypt from "bcrypt";

// register user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    // check is uer exist
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User exists" });

    // hashing password
    bcrypt.hash(password, 10, async (err: Error | undefined, hash: string) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      const user = await User.create({ name, email, password: hash });
      const token = generateToken(user._id.toString());
      res.status(201).json({ user, token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!result) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = generateToken(user._id.toString());
      res.status(200).json({ user, token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
