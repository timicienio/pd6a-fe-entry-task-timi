'use client';

import TaskType from '@/api/task/TaskType';
import updateTask from '@/api/task/updateTask';
import useSWRMutationWithClientSession from '@/api/useSWRMutationWithClientSession';
import { useRouter } from 'next/navigation';

export default function ListItem({ item }: { item: TaskType }) {
  const router = useRouter();

  const { trigger: triggerUpdateTask, isMutating } = useSWRMutationWithClientSession('tasks', updateTask);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await triggerUpdateTask({
      id: item.id,
      status: !e.target.checked ? 'pending' : 'completed'
    });
  };

  return (
    <div
      className="card min-w-fit w-full bg-base-300 shadow-xl hover:cursor-pointer hover:brightness-90 active:brightness-75 transition"
      onClick={() => router.push(`/task/${item.id}`)}
      key={item.id}
    >
      <div className="card-body flex-row items-center justify-between p-5">
        <h2 className="card-title">{item.title}</h2>
        <input
          type="checkbox"
          checked={item.status === 'completed'}
          className="checkbox disabled:cursor-pointer"
          disabled={isMutating}
          onClick={e => e.stopPropagation()}
          onChange={e => {
            e.stopPropagation();
            handleChange(e);
          }}
        />
      </div>
    </div>
  );
}
