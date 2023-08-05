import { Request, Response } from "express";
import { IContact } from "../db/util/models/IContact";
import ContactCollection from "../db/util/schemas/contactSchema";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

/**
 * @usage : Get all contacts
 * @method : GET
 * @url : http://localhost:9000/contacts/
 * @param : request
 * @param : response
 * @access : PUBLIC
 */
export const getAllContacts = async (request: Request, response: Response) => {
  try {
    const contacts: IContact[] = await ContactCollection.find();
    return response.status(200).json(contacts);
  } catch (error: any) {
    return response.status(500).json({
      msg: error.message,
    });
  }
};

/**
 * @usage : Get contact
 * @method : GET
 * @url : http://localhost:9000/contacts/:contactId
 * @param : No-params
 * @access : PUBLIC
 */
export const getContact = async (request: Request, response: Response) => {
  try {
    const { contactId } = request.params;
    const mongoContactId = new mongoose.Types.ObjectId(contactId);
    const contact: IContact | undefined | null =
      await ContactCollection.findById(mongoContactId);
    if (!contact) {
      return response.status(404).json({
        msg: "Contact is not found",
      });
    }
    return response.status(200).json(contact);
  } catch (error: any) {
    return response.status(500).json({
      msg: error.message,
    });
  }
};

/**
 * @usage : Create a contact
 * @method : POST
 * @url : http://localhost:9000/contacts/
 * @param : name , imageUrl, mobile, email, company, title, groupId
 * @access : PUBLIC
 */
export const createContact = async (request: Request, response: Response) => {
  try {
    // validate the form data
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    // Read the form data
    const { name, imageUrl, mobile, email, company, title, groupId } =
      request.body;

    // Check if the mobile exists
    const contact: IContact | undefined | null =
      await ContactCollection.findOne({
        mobile: mobile,
      });
    if (contact) {
      return response
        .status(200)
        .json({ msg: "Contact is Already Exist with same mobile number!" });
    }

    //Create a contact
    const theContact: IContact = {
      name: name,
      imageUrl: imageUrl,
      mobile: mobile,
      email: email,
      company: company,
      title: title,
      groupId: groupId,
    };

    const createdContact: IContact | undefined | null =
      await new ContactCollection(theContact).save();
    if (createdContact) {
      return response.status(200).json(createdContact);
    }
  } catch (error: any) {
    return response.status(500).json({
      msg: error.message,
    });
  }
};

/**
 * @usage : Update the contact
 * @method : PUT
 * @url : http://localhost:9000/contacts/:contactId
 * @param : name , imageUrl, mobile, email, company, title, groupId
 * @access : PUBLIC
 */
export const updateContact = async (request: Request, response: Response) => {
  try {
    // validate the form data
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { contactId } = request.params;
    const mongoContactId = new mongoose.Types.ObjectId(contactId);

    // Read the form data
    const { name, imageUrl, mobile, email, company, title, groupId } =
      request.body;

    // Check if the contact exists
    const contact: IContact | undefined | null =
      await ContactCollection.findById(mongoContactId);
    if (!contact) {
      return response.status(404).json({
        msg: "Contact is not found",
      });
    }

    // Update the contact
    const theContact: IContact = {
      name: name,
      imageUrl: imageUrl,
      mobile: mobile,
      email: email,
      company: company,
      title: title,
      groupId: groupId,
    };

    const updatedContact: IContact | undefined | null =
      await ContactCollection.findByIdAndUpdate(
        mongoContactId,
        {
          $set: theContact,
        },
        { new: true }
      );
    if (updatedContact) {
      return response.status(200).json(updatedContact);
    }
  } catch (error: any) {
    return response.status(500).json({
      msg: error.message,
    });
  }
};

/**
 * @usage : Delete a contact
 * @method : DELETE
 * @url : http://localhost:9000/contacts/
 * @param : no-param
 * @access : PUBLIC
 */
export const deleteContact = async (request: Request, response: Response) => {
  try {
    const { contactId } = request.params;
    const mongoContactId = new mongoose.Types.ObjectId(contactId);
    const contact: IContact | undefined | null =
      await ContactCollection.findById(mongoContactId);
    if (!contact) {
      return response.status(404).json({
        msg: "Contact is not found",
      });
    }

    // Delete the contact
    const deletedContact: IContact | undefined | null =
      await ContactCollection.findByIdAndDelete(mongoContactId);
    if (deletedContact) {
      return response.status(200).json({});
    }
  } catch (error: any) {
    return response.status(500).json({
      msg: error.message,
    });
  }
};
