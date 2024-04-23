'use client';
import { currencyFormat } from '../../../../utils/currencyFormat';

export interface SummaryDetailsProps {
  totalProducts: number;
  subTotal: number;
  tax: number;
  total: number;
}

export const SummaryDetails = ({
  totalProducts,
  subTotal,
  tax,
  total,
}: SummaryDetailsProps) => {
  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="text-2xl ">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right mb-2">{totalProducts} artículos</span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>
        <span className="text-2xl mt-5">TOTAL</span>
        <span className="text-right text-2xl mt-5">
          {currencyFormat(total)} MXN
        </span>
      </div>
    </div>
  );
};
