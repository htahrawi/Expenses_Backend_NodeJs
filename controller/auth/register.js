import user from "../../models/user";
import { hashPassword } from "../../utils/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validation
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6)
      return res
        .status(400)
        .send("Password is required and should be min 6 characters long");
    let userExist = await user.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");
    let hashedPassword = await hashPassword(password);
    const newUser = new user({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    
    let token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // only works on https
    });
    // send user in response
    newUser.password = undefined;
    res.json(newUser);
  } catch (error) {
    res.status(500).send("Error. Try again.");
  }
};
