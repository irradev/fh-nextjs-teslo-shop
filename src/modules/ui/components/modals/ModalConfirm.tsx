'use client';

import clsx from 'clsx';

interface Props {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
  btnConfirmText?: string;
  btnCancelText?: string;
}

export const ModalConfirm = ({
  isOpen,
  title,
  children,
  onConfirm,
  onClose,
  onCancel,
  btnConfirmText = 'Aceptar',
  btnCancelText = 'Cancelar',
}: Props) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      // x-show="open"
      className={clsx(
        'fixed fade-in inset-0 px-2 z-10 overflow-hidden flex items-center justify-center',
        {
          hidden: !isOpen,
        }
      )}
    >
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      {/* <!-- Modal Content --> */}
      <div
        // x-show="open"
        // x-transition:enter="transition-transform ease-out duration-300"
        // x-transition:enter-start="transform scale-75"
        // x-transition:enter-end="transform scale-100"
        // x-transition:leave="transition-transform ease-in duration-300"
        // x-transition:leave-start="transform scale-100"
        // x-transition:leave-end="transform scale-75"
        className={clsx(
          'bg-white rounded shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50 transition-transform ease-out duration-300',
          {
            'scale-100': isOpen,
            'scale-75': !isOpen,
          }
        )}
      >
        {/* <!-- Modal Header --> */}
        <div className="bg-gray-800 text-white px-4 py-2 flex justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        {/* <!-- Modal Body --> */}
        <div className="p-4">{children}</div>
        {/* <!-- Modal Footer --> */}
        <div className="border-t px-4 py-2 flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-3 py-1 border-2  border-gray-600 text-gray-800   rounded-md w-full sm:w-auto"
          >
            {' '}
            {btnCancelText}{' '}
          </button>

          <button
            onClick={handleConfirm}
            className="px-3 py-1 bg-gray-800 text-white  rounded-md w-full sm:w-auto"
          >
            {' '}
            {btnConfirmText}{' '}
          </button>
        </div>
      </div>
    </div>
  );
};
