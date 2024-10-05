import prisma from "./prismaClient";

export const createUser = async (user) => {
  const { id: userId, email } = user;
  try {
    await prisma.user.create({
      data: {
        userId,
        email,
      },
    });
  } catch (error) {
    console.log("Error creating user:", error);
  }
};

export async function findUserById(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
}
