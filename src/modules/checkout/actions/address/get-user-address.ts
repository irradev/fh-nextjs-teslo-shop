import prisma from '@/lib/prisma';

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        address: true,
        address_second: true,
        city: true,
        state: true,
        country: true,
        postalCode: true,
        phone: true,
      },
    });

    if (!address) return null;

    return { ...address, country: address.country.name };
  } catch (error) {
    console.log(error);
    return null;
  }
};
