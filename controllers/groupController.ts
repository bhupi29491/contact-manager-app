import { Request, Response } from "express";
import { validationResult } from "express-validator";
import GroupCollection from "../db/util/schemas/groupSchema";
import { IGroup } from "../db/util/models/IGroup";
import mongoose from "mongoose";

/**
 * @usage : Get all groups
 * @method : GET
 * @url : http://localhost:9000/groups/
 * @param : No-params
 * @access : PUBLIC
 */
export const getAllGroups = async (request: Request, response: Response) => {
  try {
    const groups: IGroup[] = await GroupCollection.find();
    return response.status(200).json(groups);
  } catch (error: any) {
    return response.status(500).json({
      msg: error.message,
    });
  }
};

/**
 * @usage : Get group
 * @method : GET
 * @url : http://localhost:9000/groups/:groupId
 * @param : No-params
 * @access : PUBLIC
 */
export const getGroup = async (request: Request, response: Response) => {
  try {
    const { groupId } = request.params;
    const mongoGroupId = new mongoose.Types.ObjectId(groupId);
    const group: IGroup | undefined | null = await GroupCollection.findById(
      mongoGroupId
    );
    if (!group) {
      return response.status(404).json({
        msg: "Group is not found",
      });
    }
    return response.status(200).json(group);
  } catch (error: any) {
    return response.status(500).json({
      msg: error.message,
    });
  }
};

/**
 * @usage : Create a group
 * @method : POST
 * @url : http://localhost:9000/groups/
 * @param : name
 * @access : PUBLIC
 */
export const createGroup = async (request: Request, response: Response) => {
  try {
    // validate the form data
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    // read the form data
    const { name } = request.body;

    // check if the group exists in db
    const group: IGroup | undefined | null = await GroupCollection.findOne({
      name: name,
    });
    if (group) {
      return response.status(401).json({
        msg: "Group is already exists!",
      });
    }

    // Create a group
    const theGroup: IGroup | undefined | null =
      await new GroupCollection<IGroup>({ name: name }).save();
    if (theGroup) {
      return response.status(200).json({
        msg: "Groups is Created",
        group: theGroup,
      });
    }
  } catch (error: any) {
    return response.status(500).json({
      msg: error.message,
    });
  }
};
