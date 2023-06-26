import { useEffect } from 'react';

const useShowModalOnMount = (
  dialogElementId: string,
  logging: boolean = false
): { closeModal: () => Promise<void> } => {
  useEffect(() => {
    logging && console.log(`mounted ${dialogElementId}`);
    (document.getElementById(dialogElementId) as HTMLDialogElement)?.showModal();
  }, [dialogElementId, logging]);

  return {
    closeModal: async () => {
      logging && console.log(`closing ${dialogElementId}`);
      (document.getElementById(dialogElementId) as HTMLDialogElement)?.close();

      // Wait for the CSS transition to complete.
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 200);
      });
    }
  };
};

export default useShowModalOnMount;
