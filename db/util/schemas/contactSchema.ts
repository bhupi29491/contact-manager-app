import mongoose from "mongoose";
import { IContact } from "../models/IContact";

const contactSchema = new mongoose.Schema<IContact>(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    groupId: { type: String, required: true },
  },
  { timestamps: true }
);

const ContactCollection = mongoose.model<IContact>("contacts", contactSchema);

export default ContactCollection;
