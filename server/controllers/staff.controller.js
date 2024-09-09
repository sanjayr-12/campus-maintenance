import bcrypt from "bcrypt";
import EId from "../model/staff.id.js";
import slug from "slug";
import { generateId } from "../utils/generateId.js";
import Staff from "../model/staff.schema.js";
import GenerateToken from "../jwt/generate.token.js";

export const signup = async (req, res) => {
  try {
    const { password, name } = req.body;

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "password must be atleast 6 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const id = generateId();
    const sulgi = slug(`${name} ${id}`);

    const newStaff = new EId({
      name,
      password: hash,
      uuid: id,
      slug: sulgi,
    });
    await newStaff.save();
    res.status(200).json({ message: "staff created successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error" + error.message,
    });
  }
};

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

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "user logged out successfully" });
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
    res.status(200).json({ message: "deleted successfully "});
  } catch (error) {
    res.status(500).json({ error: "Internal server error " + error.message });
  }
};
