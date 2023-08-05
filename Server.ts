import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { DBUtil } from "./db/util/DBUtil";
import contactRoutes from "./routes/contactRoutes";
import groupRoutes from "./routes/groupRoutes";

const app: Application = express();

// Configure dot-env
dotenv.config({ path: "./.env" });

// Configure express to read form data
app.use(express.json());

// CORS configuration
app.use(cors());

const port: string | undefined = process.env.PORT || "9000";
const dbName: string | undefined = process.env.EXPRESS_MONGO_DB_DATABASE_NAME;
const dbUrl: string | undefined = process.env.EXPRESS_MONGO_DB_CLOUD_URL;

app.get("/", (request: Request, response: Response) => {
  response.status(200);
  response.json({
    msg: "Welcome to express server",
    data: {
      output: new Date(),
    },
  });
});

// Configure routes
app.use("/contacts", contactRoutes);
app.use("/groups", groupRoutes);

if (port) {
  app.listen(Number(port), () => {
    if (dbName && dbUrl) {
      DBUtil.connectToDB(dbName, dbUrl)
        .then((response: string) => {
          console.log(response);
          console.log("Database connected successfully..!!!");
        })
        .catch((error: string) => {
          console.log(error);
          process.exit(1); // Force-stop express server
        });
    }

    console.log(`Express server is started at ${port}`);
  });
}
