'use client';

import useShowModal from '@/hooks/useShowModal';

export default function AddTodoModal() {
  const id = 'add_todo_modal';
  useShowModal(id);

  return (
    <dialog id={id} className="modal backdrop-blur-sm">
      <form method="dialog" className="modal-box opacity-100">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn">Close</button>
        </div>
      </form>
    </dialog>
  );
}
