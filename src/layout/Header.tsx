import getUser from '@/api/user/getUser';
import ThemeToggle from '@/components/ThemeToggle';
import UserDropdown from '@/components/UserDropdown';

export default async function Header() {
  return (
    <div className="p-6 fixed w-screen z-10">
      <header className="navbar rounded-lg bg-base-300 justify-between">
        <a className="btn btn-ghost normal-case text-xl">Todo List</a>
        <div>
          <ThemeToggle />
          <UserDropdown />
        </div>
      </header>
    </div>
  );
}
