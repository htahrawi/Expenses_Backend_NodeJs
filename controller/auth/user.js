import User from "../../models/user";

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").exec();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error. Try again.");
  }
};
