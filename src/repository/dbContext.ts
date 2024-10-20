import { Sequelize, DataTypes, Model } from "sequelize";

export class Context {
  private readonly sequelize: Sequelize;

  constructor(path?: string) {
    this.sequelize = new Sequelize({
      dialect: "sqlite",
      storage: path || "::memory",
    }); 
  }

  async onConnection() : Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  createTableTaskModel() : typeof taskTable{
    const taskTable = this.sequelize.define(
      "taskTable", 
      {
        Id: {type: DataTypes.STRING(255), allowNull: false, primaryKey: true},
        Action: {type: DataTypes.STRING(255), allowNull: true},
        Check: {type: DataTypes.BOOLEAN, allowNull: false},
        OnDate: {type: DataTypes.INTEGER, allowNull: false}
      }
    ); 

    return taskTable;
  }

}
