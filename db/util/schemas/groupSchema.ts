import mongoose from "mongoose";
import { IGroup } from "../models/IGroup";

const groupSchema = new mongoose.Schema<IGroup>(
  {
    name: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const GroupCollection = mongoose.model<IGroup>("groups", groupSchema);

export default GroupCollection;
