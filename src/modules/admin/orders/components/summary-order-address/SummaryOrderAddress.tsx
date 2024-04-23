'use client';

export interface SummaryOrderAddressProps {
  orderAddress: {
    firstName: string;
    lastName: string;
    address: string;
    address_second: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    phone: string;
  };
}

export const SummaryOrderAddress = ({
  orderAddress,
}: SummaryOrderAddressProps) => {
  return (
    <div className="flex flex-col gap-4 mb-10">
      <h2 className="text-2xl">Dirección de entrega</h2>

      <div className="flex flex-col gap-2 p-4 bg-blue-50 shadow-md rounded-md">
        <span className="font-semibold text-lg">
          {orderAddress.firstName} {orderAddress.lastName}
        </span>
        <div className="flex flex-wrap gap-2">
          <span>{orderAddress.address}</span>
          {orderAddress.address_second ? (
            <span>{orderAddress.address_second}</span>
          ) : null}
          {/* <span>Col. Concordia</span> */}
          <span>{orderAddress.city}</span>
        </div>
        <div className="flex gap-4">
          <span>
            {orderAddress.state}, {orderAddress.country}
          </span>
          <span>CP: {orderAddress.zipCode}</span>
        </div>
        <span className="mt-2">Teléfono: {orderAddress.phone}</span>
      </div>
    </div>
  );
};
