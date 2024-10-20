import UserModel from "../models/userdata.js";
import { errorHandler } from "../utils/errorHandler.js";
import { hash, compare } from "bcrypt";
import  jwt  from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  // console.log("Request received: ", req.body); // Log the incoming request body


  try {
    const isValidUser = await UserModel.findOne({ email }).lean();
    if (isValidUser) {
        return res.status(400).json({message:"user already exist", success:false})
      // return next(errorHandler(400, "User already exists"));
    }

    const hashedPassword = await hash(password, 10); // Async version

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
    console.log(error)
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await UserModel.findOne({ email }).lean();
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = await compare(password, validUser.password); // Async version
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token expires in 1 day
    });

    const { password: pass, ...rest } = validUser;

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "Login successful!",
      rest,
      token
    });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default   {
  signup,
  signin,
  signout,
};
