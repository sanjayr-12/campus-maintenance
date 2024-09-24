import GenerateToken from "../jwt/generate.token.js";
import Admin from "../model/admin.schema.js";
import EId from "../model/staff.id.js";

export const verifyMe = async (req, res) => {
  try {
    let result = "";
    if (req.user?.isAdmin) {
      const id = req.user._id;
      result = await Admin.findById(id).select("-password");
      if (!result) {
        return res
          .status(401)
          .json({ error: "verify fails, you are not authorized" });
      }
      GenerateToken(id, res);
      return res.status(200).json(result);
    }

    const slug = req.user.slug;
    result = await EId.findOne({ slug }).select("-password");
    if (!result) {
      return res
        .status(401)
        .json({ error: "verify fails, you are not authorized" });
    }
    GenerateToken(result._id, res)
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error " + error.message });
  }
};
