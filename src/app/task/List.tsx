'use client';

import Link from 'next/link';

import getAllTasksOfLoggedInUser from '@/api/user/getAllTasksOfLoggedInUser';
import useSWRWithClientSession from '@/api/useSWRWithClientSession';

import ListItem from './ListItem';

export default function List() {
  const { data, isLoading } = useSWRWithClientSession('tasks', getAllTasksOfLoggedInUser);

  if (isLoading)
    return (
      <div className="flex flex-col w-full gap-3">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <div className="card bg-base-300 animate-[pulse_1s_infinite]" key={`todo-list-item-skeleton-${index}`}>
              <div className="card-body flex-row items-center justify-between p-5 h-[68px]">
                <div className="h-4 bg-base-content rounded-full w-48 shadow-xl animate-[pulse_1s_infinite]"></div>
                <input type="checkbox" className="checkbox" disabled />
              </div>
            </div>
          ))}
      </div>
    );

  if (!data?.tasks)
    return (
      <div>
        <p className="text-xl font-bold text-center mb-1">You don&apos;t have any todos yet.</p>
        <p className="text-center">Add one to start.</p>
      </div>
    );

  return (
    <div className="flex flex-col w-full gap-3">
      {data.tasks?.map(item => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
