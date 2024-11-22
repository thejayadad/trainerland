import { updateAvailability } from '@/lib/action/availability/update-avail';
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
  return data;
}

const AvailabilityPage = async () => {
  const session = await authUser();
  const userData = await getData(session.user?.email as string);

  return (
    <div className="mx-auto max-w-screen-xl flex flex-col space-y-4 px-4">
      <h2 className="text-2xl font-bold mb-4">Your Availability</h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-1 w-full mx-auto max-w-screen-lg p-6'>
        <div className='flex flex-col space-y-4'>
        <form action={updateAvailability}>
        {userData.map((availability) => (
          <div
            key={availability.id}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-1"
          >
            {/* Toggle Active/Inactive */}
            <div className="flex items-center space-x-1">
              <div className="form-control">
                <input hidden name={`id-${availability.id}`} defaultValue={availability.id} />
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary toggle-sm"
                    name={`isActive-${availability.id}`}
                    defaultChecked={availability.isActive}
                  />
                </label>
              </div>
              <p>{availability.day}</p>
            </div>

            {/* Start Time Field */}
            <div>
              <select
                name={`startTime-${availability.id}`}
                className="select select-bordered select-sm w-full"
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
              <select
                name={`finishTime-${availability.id}`}
                className="select select-bordered select-sm w-full"
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
        <button type='submit'>Submit</button>
        </form>
        </div>
        <div className='border-l px-2'>2</div>
      </div>
    </div>
  );
};

export default AvailabilityPage;
