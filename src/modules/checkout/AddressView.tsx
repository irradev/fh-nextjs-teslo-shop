import { Title } from '@/modules/ui/components';
import { AddressForm } from './components';
import { getCountries, getUserAddress } from './actions';
import { auth } from '@/auth.config';

export const AddressView = async () => {
  const countries = await getCountries();
  const session = await auth();

  if (!session?.user) {
    return <h3 className="text-5xl">500 - No hay sesión de usuario</h3>;
  }

  const userStoredAddress = await getUserAddress(session.user.id);

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 main-px">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title
          title="Dirección"
          subtitle="Dirección de entrega"
        />

        <AddressForm
          countries={countries}
          userStoredAddress={
            userStoredAddress
              ? {
                  id: userStoredAddress.id!,
                  name: userStoredAddress.firstName,
                  lastName: userStoredAddress.lastName,
                  address: userStoredAddress.address,
                  address_second: userStoredAddress.address_second || undefined,
                  city: userStoredAddress.city,
                  state: userStoredAddress.state,
                  country: userStoredAddress.country,
                  zipCode: userStoredAddress.postalCode,
                  phone: userStoredAddress.phone,
                  rememberAddress: true,
                }
              : null
          }
        />
      </div>
    </div>
  );
};
