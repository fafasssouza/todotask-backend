import crypto from "crypto";

export class Task {
  private id: string;
  public action: string;
  public check: boolean;
  private date: number;

  constructor(action: string, check: boolean, _id?: string) {
    this.id = _id != null ? _id : crypto.randomUUID();
    this.action = action;
    this.check = check;
    this.date = Date.now();
  }

  public serialize() : any {
    return {
      Id: this.id,
      Action: this.action,
      Check: this.check,
      OnDate: this.date,
    }
  }
}
