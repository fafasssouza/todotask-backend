import path from "path";
import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Context } from "./repository/dbContext";
import { insertTask } from "./application/insertTask";
import { deleteTask } from "./application/deleteTask";
import { getAllTask, getTask } from "./application/getTask";
import { updateTask } from "./application/updateTask";

const app: Express = express();
app.use(express.json());
app.use(cors());

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const port = process.env.PORT || 9000;
const dbpath = process.env.DB_PATH;

const context = new Context(dbpath?.toString()); 

context.onConnection();

insertTask(app, context);
updateTask(app, context);
deleteTask(app, context);

getTask(app, context);
getAllTask(app, context);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
