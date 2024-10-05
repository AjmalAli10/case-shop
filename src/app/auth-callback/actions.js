"use server";

import { createUser, findUserById } from "@/db/userDB";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getAuthStatus = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user.email) {
    throw new Error("Invalid user data");
  }

  const existingUser = await findUserById(user.id);

  if (!existingUser) {
    await createUser(user);
  }

  return { success: true };
};
