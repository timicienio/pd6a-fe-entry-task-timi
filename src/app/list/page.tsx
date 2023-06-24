import getUserTasks from '@/api/user/getUserTasks';

export default async function List() {
  const res = await getUserTasks();

  return (
    <div className="flex flex-col gap-3">
      {res.tasks?.map(item => (
        <div className="card min-w-fit bg-neutral-focus shadow-xl" key={item.id}>
          <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
