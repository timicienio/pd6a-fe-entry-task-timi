import { useEffect } from 'react';

const useShowModal = (dialogElementId: string) =>
  useEffect(() => {
    (document.getElementById(dialogElementId) as HTMLDialogElement).showModal();
  }, [dialogElementId]);

export default useShowModal;
