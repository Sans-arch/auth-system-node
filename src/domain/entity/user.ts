import { v4 as uuid } from "uuid";

export default class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(id: string, name: string, email: string, password: string, created_at: Date, updated_at: Date) {
    this._id = id || uuid();
    this._name = name;
    this._email = email;
    this._password = password;
    this._created_at = created_at || new Date();
    this._updated_at = updated_at || new Date();
  }
}
