import getLoggedInUser from '@/lib/api/user/getLoggedInUser';
import withSession from '@/lib/withSession';
import ThemeToggle from '@/components/ThemeToggle';
import UserDropdown from '@/components/UserDropdown';

export default async function Header() {
  const res = await withSession(getLoggedInUser)();
  const user = res?.user ?? null;

  return (
    <div className="p-6 fixed w-screen z-10">
      <header className="navbar rounded-lg bg-base-300 justify-between">
        <a className="btn btn-ghost normal-case text-xl font-bold">Todo List</a>
        <div>
          <ThemeToggle />
          <UserDropdown user={user} />
        </div>
      </header>
    </div>
  );
}
