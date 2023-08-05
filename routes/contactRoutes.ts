import { Request, Response, Router } from "express";
import * as contactController from "../controllers/contactController";
import { body, validationResult } from "express-validator";

const contactRoutes: Router = Router();

/**
 * @usage : Get all contacts
 * @method : GET
 * @url : http://localhost:9000/contacts/
 * @param : No-params
 * @access : PUBLIC
 */
contactRoutes.get("/", async (request: Request, response: Response) => {
  await contactController.getAllContacts(request, response);
});

/**
 * @usage : Get single contact
 * @method : GET
 * @url : http://localhost:9000/contacts/:contactId
 * @param : No-params
 * @access : PUBLIC
 */
contactRoutes.get(
  "/:contactId",
  async (request: Request, response: Response) => {
    await contactController.getContact(request, response);
  }
);

/**
 * @usage : Create a contact
 * @method : POST
 * @url : http://localhost:9000/contacts/
 * @param : name , imageUrl, mobile, email, company, title, groupId
 * @access : PUBLIC
 */
contactRoutes.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("company").not().isEmpty().withMessage("Company is required"),
    body("email").isEmail().withMessage("Proper email is required"),
    body("title").not().isEmpty().withMessage("title is required"),
    body("mobile").not().isEmpty().withMessage("mobile is required"),
    body("imageUrl").not().isEmpty().withMessage("imageUrl is required"),
    body("groupId").not().isEmpty().withMessage("groupId is required"),
  ],
  async (request: Request, response: Response) => {
    await contactController.createContact(request, response);
  }
);

/**
 * @usage : Update the contact
 * @method : PUT
 * @url : http://localhost:9000/contacts/:contactId
 * @param : name , imageUrl, mobile, email, company, title, groupId
 * @access : PUBLIC
 */
contactRoutes.put(
  "/:contactId",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("company").not().isEmpty().withMessage("Company is required"),
    body("email").isEmail().withMessage("Proper email is required"),
    body("title").not().isEmpty().withMessage("title is required"),
    body("mobile").not().isEmpty().withMessage("mobile is required"),
    body("imageUrl").not().isEmpty().withMessage("imageUrl is required"),
    body("groupId").not().isEmpty().withMessage("groupId is required"),
  ],
  async (request: Request, response: Response) => {
    await contactController.updateContact(request, response);
  }
);

/**
 * @usage : Delete a contact
 * @method : DELETE
 * @url : http://localhost:9000/contacts/
 * @param : no-param
 * @access : PUBLIC
 */
contactRoutes.delete(
  "/:contactId",
  async (request: Request, response: Response) => {
    await contactController.deleteContact(request, response);
  }
);

export default contactRoutes;
