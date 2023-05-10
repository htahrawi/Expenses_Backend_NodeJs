import user from "../../models/user";
import { comparePassword } from "../../utils/auth";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if user with that email exist
    let userExist = await user.findOne({ email }).exec();
    if (!userExist) return res.status(400).send("No user found");
    // compare password
    let match = await comparePassword(password, userExist.password);
    if (!match) return res.status(400).send("Wrong password");
    // generate token
    let token = jwt.sign({ _id: userExist._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // only works on https
    });
    // send user in response
    userExist.password = undefined;
    res.json(userExist);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error. Try again.");
  }
};
