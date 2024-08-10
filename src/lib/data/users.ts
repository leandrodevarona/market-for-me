import { db } from "../db";

export async function getUsers() {
  try {
    const users = await db.user.findMany();

    return users;
  } catch (error) {
    return null;
  }
}
