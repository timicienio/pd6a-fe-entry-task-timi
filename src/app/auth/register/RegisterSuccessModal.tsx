'use client';

import { useRouter } from 'next/navigation';

export interface RegisterSuccessModalProps {
  show: boolean;
}

export default function RegisterSuccessModal({ show }: RegisterSuccessModalProps) {
  const router = useRouter();

  return (
    <dialog className={`modal ${show ? 'modal-open' : ''}`}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Done!</h3>
        <p className="py-4">Now, log in with your brand new account!</p>
        <div className="modal-action">
          <button
            className="btn btn-success"
            onClick={() => {
              router.push('/auth/login');
            }}
          >
            Go To Login
          </button>
        </div>
      </form>
    </dialog>
  );
}
