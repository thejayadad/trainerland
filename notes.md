## CREATE THE APP

clean up
package.json
- daisyui

## DATABASE AUTHENICATION

auth.js
npm i -D prisma
npm i @prisma/client
npx prisma init
Vercel setup
providers
update models
google
npm exec prisma migrate dev
npx prisma generate


## HEADER & AUTH HOOK
- add hook to redirect user


```
import { authUser } from '@/lib/hooks';
import { prisma } from '@/lib/prisma';
import { times } from '@/lib/times';
import { notFound } from 'next/navigation';
import React from 'react';

interface Availability {
  id: string;
  day: string;
  startTime: string;
  finishTime: string;
  isActive: boolean;
}

async function getData(userEmail: string): Promise<Availability[]> {
  const data = await prisma.availability.findMany({
    where: { userEmail },
    orderBy: { day: 'asc' }, // Optional: Order by day
  });

  if (!data || data.length === 0) {
    return notFound();
  }
  console.log("Database Availability Data:", data);
  return data;
}

const AvailabilityPage = async () => {
  const session = await authUser();
  const userData = await getData(session.user?.email as string);

  return (
    <div className="mx-auto max-w-screen-xl flex flex-col space-y-4 px-4">
      <h2 className="text-2xl font-bold mb-4">Your Availability</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userData.map((availability) => (
          <div
            key={availability.id}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4"
          >
            {/* Toggle Active/Inactive */}
            <div className="flex items-center space-x-3">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    name={`isActive-${availability.id}`}
                    defaultChecked={availability.isActive}
                  />
                </label>
              </div>
              <p>{availability.day}</p>
            </div>

            {/* Start Time Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <select
                name={`startTime-${availability.id}`}
                className="select select-bordered w-full max-w-xs"
                defaultValue={availability.startTime}
              >
                {times.map((time) => (
                  <option
                    key={`${availability.id}-start-${time.id}`}
                    value={time.time}
                  >
                    {time.time}
                  </option>
                ))}
              </select>
            </div>

            {/* Finish Time Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Finish Time</label>
              <select
                name={`finishTime-${availability.id}`}
                className="select select-bordered w-full max-w-xs"
                defaultValue={availability.finishTime}
              >
                {times.map((time) => (
                  <option
                    key={`${availability.id}-finish-${time.id}`}
                    value={time.time}
                  >
                    {time.time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityPage;


```