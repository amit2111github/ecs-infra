import { addUser } from "../accessor/user.js";
import { createUserSchema } from "../type/user.js";
import { formatError, getJwtToken, hashPassword } from "../utils/index.js";
export const createUser = async (req, res) => {
  try {
    const { body } = req;
    const { success, error } = createUserSchema.safeParse(body);
    if (error) {
      return res.status(400).json({
        error: formatError(error),
      });
    }
    const hashedPassword = await hashPassword(body.password);
    await addUser({ ...body, password: hashedPassword });
    const token = getJwtToken({ name: body.name, email: body.email });
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
    return res.status(500).json({ error: err.message });
  }
};
