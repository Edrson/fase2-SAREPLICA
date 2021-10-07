import { resGen } from "../models/resGen";
export interface IAddUser {
  DB_AddUser(item: any): Promise<resGen>;
}
