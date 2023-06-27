'use client';

import getAllTasksOfLoggedInUser from '@/lib/api/user/getAllTasksOfLoggedInUser';
import useSWRWithClientSession from '@/hooks/useSWRWithClientSession';
import useShowModalOnMount from '@/hooks/useShowModalOnMount';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import useSWRMutationWithClientSession from '@/hooks/useSWRMutationWithClientSession';
import deleteTask from '@/lib/api/task/deletaTask';
import { useMemo } from 'react';

export default function TodoDetailModal({ id }: { id: string }) {
  const { closeModal } = useShowModalOnMount('todo_detail_modal');

  const router = useRouter();

  const { data } = useSWRWithClientSession('tasks', getAllTasksOfLoggedInUser);
  const item = useMemo(() => data?.tasks?.find(task => task.id === id), [id, data]);

  const { trigger: triggerDeleteTask, isMutating } = useSWRMutationWithClientSession('tasks', deleteTask);

  console.log(data, item);

  return (
    <dialog
      id="todo_detail_modal"
      className="modal backdrop-blur-sm"
      // Prevent modal closing on ECS keystroke.
      onCancel={e => e.preventDefault()}
    >
      <form method="dialog" className="modal-box">
        {item ? (
          <>
            <h2 className="card-title mb-4">{item?.title}</h2>
            <div className="w-full">
              <p className="py-2 flex justify-between">
                <span className="font-bold">Status</span>
                <span className="">{item?.status === 'completed' ? 'Completed' : 'Pending'}</span>
              </p>
              <p className="py-2 flex justify-between">
                <span className="font-bold">Start Time</span>
                <span className="">{item?.startTime && moment(item.startTime).format('MMM DD, YYYY HH:mm')}</span>
              </p>
              <p className="py-2 flex justify-between">
                <span className="font-bold">End Time</span>
                <span className="">{item?.endTime && moment(item.endTime).format('MMM DD, YYYY HH:mm')}</span>
              </p>
            </div>
            <div className="modal-action justify-between">
              <Button
                className="btn-error"
                loading={isMutating}
                onClick={async e => {
                  e.preventDefault();
                  await triggerDeleteTask({ id: item.id });
                  await closeModal();
                  router.push('/task');
                }}
              >
                Delete
              </Button>
              <Button
                type="submit"
                onClick={async e => {
                  e.preventDefault();
                  await closeModal();
                  router.push('/task');
                }}
              >
                Back
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="h-4 bg-base-content rounded-full w-48 shadow-xl mb-6" />
            <div className="h-2 bg-base-content rounded-full dark:bg-gray-700 max-w-[330px] mb-4"></div>
            <div className="h-2 bg-base-content rounded-full dark:bg-gray-700 max-w-[300px] mb-4"></div>
            <div className="h-2 bg-base-content rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </>
        )}
      </form>
    </dialog>
  );
}
