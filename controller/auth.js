import { userSignInObject } from "../type/user.js";
import { formatError, getJwtToken } from "../utils/index.js";

export const signInUser = async (req, res) => {
  try {
    const { body } = req;
    const { error } = userSignInObject.parse(body);
    if (error) {
      return res.status(400).json({ error: formatError(error) });
    }
    const token = getJwtToken(body);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24,
    });
    return res.json({
      success: "ok",
      user: { name: body.name, email: body.email },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errro: err.message });
  }
};
