// app/dashboard/page.tsx
import { authUser } from '@/lib/hooks';
import { createDefaultAvailability } from '@/lib/hooks/create-user-avail';
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

const DashboardPage = async () => {
  const session = await authUser();
  const userEmail = session.user?.email;

  if (!userEmail) {
    redirect("/")
  }

  // Check if the user already has availability
  const existingAvailability = await prisma.availability.findFirst({
    where: { userEmail },
  });

  // Create availability only if it doesn't exist
  if (!existingAvailability) {
    await createDefaultAvailability(userEmail);
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {userEmail}!</p>
      <p>Your default availability has been set.</p>
    </div>
  );
};

export default DashboardPage;
