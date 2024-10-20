import { Task } from "./task";

export interface ITaskRepository {
  save(task: Task) : Promise<void>;
  delete(Id: string): Promise<boolean>;
  getTask(Id: string) : Promise<Object>;
  getAllTask() : Promise<Object[]>;
}
