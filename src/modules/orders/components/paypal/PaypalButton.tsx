'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import type {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js';
import { paypalCheckPayment, setOrderTransactionId } from '../../actions';

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const rounedAmount = Math.round(amount * 100) / 100;

  if (isPending)
    return (
      <div className="animate-pulse mt-4 mb-11">
        <div className="h-[45px] bg-gray-300 rounded mb-[14px]"></div>
        <div className="h-[45px] bg-gray-300 rounded "></div>
      </div>
    );

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: rounedAmount.toString(),
            currency_code: 'MXN',
          },
        },
      ],
    });

    const { ok } = await setOrderTransactionId(orderId, transactionId);

    if (!ok) {
      throw new Error('No se pudo actualizar la orden');
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();

    if (!details) {
      throw new Error('No se pudo realizar el pago');
    }

    await paypalCheckPayment(details.id!);
  };

  return (
    <div className=" relative mt-4 z-0">
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  );
};
