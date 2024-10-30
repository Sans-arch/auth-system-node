import { v4 as uuid } from "uuid";

interface UserProps {
  id?: string;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}

export default class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(props: UserProps) {
    this._id = props.id || uuid();
    this._name = props.name;
    this._email = props.email;
    this._created_at = props.created_at || new Date();
    this._updated_at = props.updated_at || new Date();
    this.validate();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get created_at() {
    return this._created_at;
  }

  get updated_at() {
    return this._updated_at;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changeEmail(email: string): void {
    this._email = email;
    this.validate();
  }

  private validate() {
    if (!this._name || this._name.length < 3) {
      throw new Error("User name is required");
    }

    if (!this._email || !this._email.includes("@")) {
      throw new Error("User email is required");
    }
  }
}
