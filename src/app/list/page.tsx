import getAllTasksOfLoggedInUser from '@/api/user/getAllTasksOfLoggedInUser';
import withSession from '@/api/withSession';
import Link from 'next/link';

export default async function List() {
  const res = await withSession(getAllTasksOfLoggedInUser)();

  if (!res?.tasks)
    return (
      <div>
        <p className="text-xl font-bold text-center">You don&apos;t have any todos yet.</p>
        <p className="text-center">
          <Link href="/list/new" className="link">
            Add one
          </Link>{' '}
          to start.
        </p>
      </div>
      // <div className="card min-w-fit bg-neutral-focus shadow-xl">
      //   <div className="card-body">
      //   </div>
      // </div>
    );

  return res.tasks?.map(item => (
    <div className="card min-w-fit bg-neutral-focus shadow-xl" key={item.id}>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
      </div>
    </div>
  ));
}
