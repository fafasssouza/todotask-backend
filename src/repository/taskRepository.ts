import { ITaskRepository } from "../domain/taskRepositoryImpl";
import { Task } from "../domain/task";
import { Context } from "./dbContext"

export class TaskRepository implements ITaskRepository {
  private context: Context;
  constructor(_context: Context) {
    this.context = _context;
  }
  async save(task: Task) : Promise<void> { 
    const tableTask = this.context.createTableTaskModel(); 
    await tableTask.sync();

    try { 
      await tableTask.create(task.serialize());
    }catch(error) {
      throw "This Shit Happens "+error;
    }
  }

  async update(Id: string, check: boolean) : Promise<void> {
    const tableTask = this.context.createTableTaskModel(); 
    await tableTask.sync();

    try {
      await tableTask.update(
        {Check: check}, 
        {where: {Id: Id,},
      }); 
 
    }catch(error) {
        throw "This Shit Happens "+error;
    }
  }

  async delete(Id: string) : Promise<boolean> {
    const tableTask = this.context.createTableTaskModel(); 
    await tableTask.sync();

    try { 
      const userWillBeDeleted = await tableTask.findAll({
        where: {Id: Id,},
      }); 
     
      if(userWillBeDeleted != undefined) {
        await userWillBeDeleted[0].destroy();
        return true;
      }
      return false; 
    } catch(error) {
        throw "This Shit Happens "+error;
    }
  }

  async getTask(Id: string) : Promise<Object> {
    const tableTask = this.context.createTableTaskModel(); 
    await tableTask.sync();

    try { 
      const userWillBeSearch = await tableTask.findAll({
        where: {Id: Id,},
      }); 
     
      return userWillBeSearch[0];
    } catch(error) {
        throw "This Shit Happens "+error;
    }
  }

  async getAllTask() : Promise<Object[]> {
    const tableTask = this.context.createTableTaskModel(); 
    await tableTask.sync();

    try { 
      const userWillBeSearch = await tableTask.findAll(); 
     
      return userWillBeSearch;
      
    } catch(error) {
        throw "This Shit Happens "+error;
    }
  }
}
