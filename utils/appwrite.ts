import { Account, Client, Databases, Storage, Avatars } from "appwrite";
import { APP_WRITE_ID } from "~/app.constants";
export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(APP_WRITE_ID)
  .setSession("");

export const account = new Account(client);
export { ID } from "appwrite";
export const DB = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
