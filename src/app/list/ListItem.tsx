'use client';

import TaskType from '@/api/task/TaskType';
import updateTask from '@/api/task/updateTask';
import useSWRMutationWithClientSession from '@/api/useSWRMutationWithClientSession';

export default function ListItem({ item }: { item: TaskType }) {
  const { trigger: triggerUpdateTask, isMutating } = useSWRMutationWithClientSession('tasks', updateTask);

  const handleClickCheckbox = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    await triggerUpdateTask({
      id: item.id,
      status: item.status === 'completed' ? 'not completed' : 'completed'
    });
  };

  return (
    <div
      className="card min-w-fit w-full bg-base-300 shadow-xl hover:cursor-pointer hover:brightness-90 transition"
      key={item.id}
    >
      <div className="card-body flex-row items-center justify-between p-5">
        <h2 className="card-title">{item.title}</h2>
        <input
          type="checkbox"
          checked={item.status === 'completed'}
          className="checkbox disabled:cursor-pointer"
          disabled={isMutating}
          onChange={handleClickCheckbox}
        />
      </div>
    </div>
  );
}
