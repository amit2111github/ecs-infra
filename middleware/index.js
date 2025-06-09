import { verifyToken } from "../utils/index.js";

export const Authentication = (req, res,next) => {
  try {
    const token = req.cookies?.["token"];
    if(!token) {
        return res.status(403).json({error : "Not Authenricated"});
    }
    const {payload , error} = verifyToken(token);
    if(error) {
        return res.status(403).json({error : "Not Authenricated"});
    }
    req.user = payload;
    next();
  } catch (err) {
    console.log(err);
    return res.json({ error: err.message });
  }
};
