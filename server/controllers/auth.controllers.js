import bcrypt from "bcrypt";
import Admin from "../model/admin.schema.js";
import GenerateToken from "../jwt/generate.token.js";
import EId from "../model/staff.id.js";
import Staff from "../model/staff.schema.js";
import slug from "slug";
import { generateId } from "../utils/generateId.js";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const existingEmail = await Admin.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "email already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "password must be atleast 6 characters long" });
    }

    //hash it
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      email,
      password: hash,
    });

    await newAdmin.save();

    res.status(200).json({ message: "Admin accounted created" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error " + error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loginAdmin = await Admin.findOne({ email });
    // console.log(loginAdmin);
    const checkPassword = await bcrypt.compare(
      password,
      loginAdmin?.password || ""
    );
    // console.log(checkPassword);

    if (!loginAdmin || !checkPassword) {
      return res.status(400).json({ error: "invalid email or password" });
    }

    GenerateToken(loginAdmin._id, res);

    res.status(200).json({
      _id: loginAdmin._id,
      name: loginAdmin.name,
      email: loginAdmin.email,
      isAdmin: loginAdmin.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error " + error.message });
  }
};

// export const logout = async (req, res) => {
//   try {
//     res.cookie("token", "", { maxAge: 0 });
//     res.status(200).json({ message: "logged out successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "internal server error" });
//   }
// };

export const addWorkers = async (req, res) => {
  try {
    const { slug, workers, location } = req.body;
    const getStaff = await EId.findOne({ slug });
    if (!getStaff) {
      return res.status(400).json({ error: "No Staff found" });
    }
    const check = await Staff.findOneAndUpdate(
      { slug },
      {
        $set: {
          workers,
        },
      },
      { new: true }
    );
    if (check) {
      return res
        .status(200)
        .json({ message: "already assigned and updated the workers" });
    }

    const newData = new Staff({
      name: getStaff.name,
      staffId: getStaff.uuid,
      slug,
      location,
      workers,
    });

    await newData.save();
    res.status(200).json({ message: "data addded", newData });
  } catch (error) {
    res.status(500).json({ error: "Internal server error " + error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const getData = await Staff.find();
    res.status(200).json(getData);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error " + error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const checkStaff = await Staff.findByIdAndDelete(id);

    if (!checkStaff) {
      return res.status(400).json({ error: "there is no staff" });
    }
    res.status(200).json({
      message: `${checkStaff.name} - ${checkStaff.slug} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error " + error.message });
  }
};

export const verifyMe = async (req, res) => {
  try {
    const id = req.admin._id;
    // console.log(id);
    const result = await Admin.findById(id).select("-password");
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

export const staffRegister = async (req, res) => {
  try {
    const { password, name } = req.body;

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "password must be atleast 6 characters long" });
    }

    if (!req.user?.isAdmin) {
      return res.status(401).json({ error: "you are not authorized" });
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
