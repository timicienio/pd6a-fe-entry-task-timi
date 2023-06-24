'use client';

import { getCookie, deleteCookie } from 'cookies-next';
import moment from 'moment';

import UserType from '@/api/user/UserType';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';
import { signOut } from 'next-auth/react';

export default function UserDropdown({ user }: { user: UserType | null }) {
  const router = useRouter();

  if (!user) return <></>;

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-circle btn-info m-1">
        {user.firstName.at(0)}
        {user.lastName.at(0)}
      </label>
      <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 mt-1 p-2 shadow bg-info text-base-100">
        <div className="card-body">
          <h3 className="card-title">Hello, {`${user.firstName} ${user.lastName}`}</h3>
          <p>{user.email}</p>
          <p>Joined on {moment(user.timeAdded).format('MMM D, yyyy')}</p>
          <div className="modal-action">
            <button
              className="btn btn-secondary"
              onClick={() => {
                signOut();
                router.push('/auth/login');
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
