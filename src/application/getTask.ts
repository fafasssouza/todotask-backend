import { Express, Request, Response } from "express";
import { TaskRepository } from "../repository/taskRepository";
import { Context } from "../repository/dbContext";

export async function getTask(app: Express, context: Context) : Promise<void> {
  app.post("/gettask/", async (req: Request, res: Response) => {
    try {

      const { id } = req.body;
      if(id == null) {
          throw new Error("You dont pass the id!");
      }
      const taskRepository = new TaskRepository(context);

      const reqResult = await taskRepository.getTask(id);

      if(reqResult) {
        res.status(200).send(reqResult);
      } else { 
        res.status(202).send("Something go wrong, try later!");
      } 
    }catch(error) {
      res.status(500).send("This happens "+ error); 
    } 
  });
}

export async function getAllTask(app: Express, context: Context) : Promise<void> {
  app.get("/getalltask/", async (req: Request, res: Response) => {
    try {
      const taskRepository = new TaskRepository(context);

      const reqResult = await taskRepository.getAllTask(); 

      if(reqResult) {
        res.status(200).send(reqResult);
      } else { 
        res.status(202).send("Something go wrong, try later!");
      } 
    }catch(error) {
      res.status(500).send("This happens "+ error); 
    } 
  });
}
