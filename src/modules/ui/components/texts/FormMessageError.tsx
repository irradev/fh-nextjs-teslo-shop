import { IoAlertCircleOutline } from 'react-icons/io5';

export const FormMessageError = ({ message }: { message?: string }) => {
  return (
    <div
      className="flex mt-1  items-center space-x-1"
      aria-live="polite"
      aria-atomic="true"
    >
      <IoAlertCircleOutline
        className=" text-red-500 flex-shrink-0"
        size={18}
      />

      <p className="text-sm text-red-500">{message || 'Valor incorrecto.'}</p>
    </div>
  );
};
