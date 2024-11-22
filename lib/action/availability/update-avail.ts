'use server';

import { authUser } from "@/lib/hooks";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAvailability(formData: FormData): Promise<void> {
  const session = await authUser();

  if (!session || !session.user?.email) {
    throw new Error("Unauthorized");
  }

  const rawData = Object.fromEntries(formData.entries());
  const availabilityData = Object.keys(rawData)
    .filter((key) => key.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");
      return {
        id,
        isActive: rawData[`isActive-${id}`] === "on",
        startTime: rawData[`startTime-${id}`] as string,
        finishTime: rawData[`finishTime-${id}`] as string,
      };
    });

  await prisma.$transaction(
    availabilityData.map((item) =>
      prisma.availability.update({
        where: { id: item.id },
        data: {
          isActive: item.isActive,
          startTime: item.startTime,
          finishTime: item.finishTime,
        },
      })
    )
  );

  revalidatePath("/dashboard/availability");
}
