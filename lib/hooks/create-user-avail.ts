'use server'
// lib/helpers/createDefaultAvailability.ts
import { prisma } from "../prisma";

export const createDefaultAvailability = async (userEmail: string) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  try {
    const defaultAvailability = daysOfWeek.map((day) => ({
      userEmail,
      day,
      startTime: "09:00",
      finishTime: "18:00",
      isActive: true,
    }));

    const result = await prisma.availability.createMany({
      data: defaultAvailability,
      skipDuplicates: true, // Ensure no duplicate entries
    });

    console.log("Default availability created:", result);
    return result;
  } catch (error) {
    console.error("Error creating default availability:", error);
    throw new Error("Failed to create default availability.");
  }
};
