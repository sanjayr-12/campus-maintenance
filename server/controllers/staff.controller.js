import bcrypt from "bcrypt";
import EId from "../model/staff.id.js";
import Staff from "../model/staff.schema.js";
import GenerateToken from "../jwt/generate.token.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const getStaff = await EId.findOne({ slug: username });
    if (!getStaff) {
      return res.status(400).json({ error: "No user found" });
    }
    const checkPass = await bcrypt.compare(password, getStaff.password || "");
    if (!checkPass) {
      return res.status(400).json({ error: "Password doesnt match" });
    }
    GenerateToken(getStaff._id, res);

    res.status(200).json({
      _id: getStaff._id,
      name: getStaff.name,
      slug: username,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const slug = req.user.slug;
    const data = await Staff.findOne({ slug });
    if (!data) {
      return res.status(400).json({ error: "No data found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error " + error.message });
  }
};

export const updateWorkers = async (req, res) => {
  try {
    const { workers } = req.body;
    const slug = req.user.slug;
    const staff = await Staff.findOne({ slug });
    if (!staff) {
      return res.status(400).json({ error: "No Staff found" });
    }
    const update = await Staff.findOneAndUpdate(
      { slug },
      {
        $push: {
          workers,
        },
      },
      { new: true }
    );

    if (update) {
      return res.status(200).json({ message: "data updated" });
    }
    return res.status(400).json({ message: "something went wrong" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
};

export const deleteWorkers = async (req, res) => {
  try {
    const { id } = req.params;
    const staffId = req.user.slug;
    const deleteOne = await Staff.updateOne(
      { slug: staffId },
      { $pull: { workers: { _id: id } } },
      { new: true }
    );
    if (!deleteOne) {
      return res.status(400).json({ error: "cant delete" });
    }
    res.status(200).json({ message: "deleted successfully " });
  } catch (error) {
    res.status(500).json({ error: "Internal server error " + error.message });
  }
};

export const verifyMe = async (req, res) => {
  try {
    const id = req.user.slug;
    const result = await EId.find({ slug: id }).select("-password");
    if (!result) {
      return res
        .status(401)
        .json({ error: "verify fails, you are not authorized" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error " + error.message });
  }
};
