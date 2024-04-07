import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
  isOrderPaid: boolean;
  className?: string;
}

export const PaymentStatusBadge = ({ isOrderPaid, className }: Props) => {
  return (
    <div
      className={clsx(
        'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
        className,
        {
          'bg-red-500': !isOrderPaid,
          'bg-green-700': isOrderPaid,
        }
      )}
    >
      <IoCardOutline size={30} />
      {isOrderPaid ? (
        <span className="mx-2">Pagada</span>
      ) : (
        <span className="mx-2">Pendiente de pago</span>
      )}
    </div>
  );
};
