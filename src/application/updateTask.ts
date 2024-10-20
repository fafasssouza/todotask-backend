import { Express, Request, Response } from "express";
import { TaskRepository } from "../repository/taskRepository";
import { Context } from "../repository/dbContext";

export async function updateTask(app: Express, context: Context) : Promise<void> {

  app.post("/updatetask", async (req: Request, res: Response) => {
    try {
      const {id, check} = req.body;
      if(check == null) {
        throw new Error("Check cannot be null");
      }
      const taskRepository = new TaskRepository(context);

      await taskRepository.update(id, check);
      
      res.status(203).json(true);
    }catch(error) {
      res.status(500).send("This happens "+ error); 
    } 
  });
}
