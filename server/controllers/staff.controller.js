import bcrypt from "bcrypt";
import EId from "../model/staff.id.js";
import slug from "slug"
import { generateId } from "../utils/generateId.js";

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

      const id = generateId()
      const sulgi = slug(`${name} ${id}`)

       const newStaff = new EId({
           name,
           password: hash,
           uuid:id,
           slug:sulgi
       });
      await newStaff.save();  
    res.status(200).json({message:"staff created successfully"})  
      
  } catch (error) { 
      res.status(500).json({
          error: "Internal server error" + error.message
      })
  }
};
