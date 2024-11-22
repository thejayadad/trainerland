import { authUser } from '@/lib/hooks';
import { createDefaultAvailability } from '@/lib/hooks/create-user-avail';
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

interface Training {
  id: string;
  active: boolean;
  title: string;
  color: string;
  duration: number;
  category: string;
  description: string;
}

async function getUserTrainings(userEmail: string): Promise<Training[]> {
  const userWithTrainings = await prisma.user.findUnique({
    where: { email: userEmail },
    select: {
      trainings: {
        select: {
          id: true,
          active: true,
          title: true,
          color: true,
          duration: true,
          category: true,
          description: true,
        },
      },
    },
  });

  if (!userWithTrainings) {
    return notFound();
  }

  return userWithTrainings.trainings;
}

async function createDefaultAvailabilityIfNeeded(userEmail: string) {
  const existingAvailability = await prisma.availability.findFirst({
    where: { userEmail },
  });

  if (!existingAvailability) {
    await createDefaultAvailability(userEmail);
  }
}

const DashboardPage = async () => {
  const session = await authUser();
  const userEmail = session.user?.email;

  if (!userEmail) {
    redirect('/');
  }

  await createDefaultAvailabilityIfNeeded(userEmail);

  const trainings = await getUserTrainings(userEmail);

  return (
    <div className="mx-auto max-w-screen-lg p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">Welcome, {userEmail}!</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Your Trainings</h2>
        {trainings.length > 0 ? (
          <ul className="space-y-4">
            {trainings.map((training: Training) => (
              <li
                key={training.id}
                className="p-4 border rounded shadow-md bg-white hover:bg-gray-100"
              >
                <h3 className="text-lg font-bold text-blue-600">{training.title}</h3>
                <p className="text-gray-500">{training.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-gray-700">
                    Duration: {training.duration} mins
                  </span>
                  <span
                    className="px-2 py-1 text-xs font-semibold rounded"
                    style={{ backgroundColor: training.color }}
                  >
                    {training.category}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No trainings created yet.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
