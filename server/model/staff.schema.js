import mongoose from "mongoose";
import { generateId } from "../utils/generateId.js";

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  staffId: {
    type: String,
  },
  slug: {
    type: String,
  },
  location: {
    type: String,
  },
  workers: [
    {
      id: {
        type: String,
        default: generateId,
      },
      name: {
        type: String,
      },
    },
  ],
});

staffSchema.pre("save", function (next) {
  this.workers.forEach((worker) => {
    if (!worker.id) {
      worker.id = generateId(); // Generate a unique ID if not provided
    }
  });
  next();
});

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
