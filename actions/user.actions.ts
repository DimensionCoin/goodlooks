"use server";

import User from "@/models/user.model";
import { connect } from "@/db";

/**
 * Create a new user in the database.
 */
export async function createUser(user: any) {
  try {
    await connect();
    const userData = {
      ...user,
    };
    const newUser = await User.create(userData);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("❌ Error creating user:", error);
    throw new Error("Error creating user");
  }
}

/**
 * Fetch a user by Clerk ID.
 */
export async function getUser(userId: string) {
  try {
    await connect();
    const user = await User.findOne({ clerkId: userId });
    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Error fetching user");
  }
}

