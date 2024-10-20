import { Express, Request, Response } from "express";
import { TaskRepository } from "../repository/taskRepository";
import { Context } from "../repository/dbContext";
import { Task } from "../domain/task";

export async function insertTask(app: Express, context: Context) : Promise<void> {

  app.post("/sendtask", async (req: Request, res: Response) => {
    try {
      const {task, check} = req.body;
      if(check == null) {
        throw new Error("Check cannot be null");
      }
      const taskRepository = new TaskRepository(context);
      const newTask: Task = new Task(task, check);

      await taskRepository.save(newTask);
      
      res.status(201).json(newTask);
    }catch(error) {
      res.status(500).send("This happens "+ error); 
    } 
  });
}
