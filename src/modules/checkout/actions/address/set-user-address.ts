'use server';

import prisma from '@/lib/prisma';
import { type CheckoutAddress } from '../../interfaces';

interface Props {
  address: Omit<CheckoutAddress, 'rememberAddress'>;
  userId: string;
}
export const setUserAddress = async ({ address, userId }: Props) => {
  try {
    const savedAddress = await createOrReplaceAddres({ address, userId });

    return {
      ok: true,
      message: 'Dirección guardada',
      address: savedAddress,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo guardar la dirección.',
    };
  }
};

const createOrReplaceAddres = async ({ address, userId }: Props) => {
  try {
    const { country, name, zipCode, ...rest } = address;

    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId: userId,
      },
    });

    const countryDB = await prisma.country.findUnique({
      where: {
        name: address.country,
      },
    });

    if (!countryDB) {
      throw new Error('País no encontrado');
    }

    if (!storedAddress) {
      const newAddres = await prisma.userAddress.create({
        data: {
          ...rest,
          firstName: address.name,
          userId: userId,
          countryId: countryDB.id,
          postalCode: address.zipCode,
        },
      });

      return newAddres;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: {
        id: storedAddress.id,
      },
      data: {
        ...rest,
        firstName: address.name,
        userId: userId,
        countryId: countryDB.id,
        postalCode: address.zipCode,
      },
    });

    return updatedAddress;
  } catch (error) {
    console.log(error);
    throw new Error('No se pudo guardar la dirección.');
  }
};
