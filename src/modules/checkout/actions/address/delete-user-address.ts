import prisma from '@/lib/prisma';

export const deleteUserAddressById = async (addressId: string) => {
  try {
    const deletedAddress = await prisma.userAddress.delete({
      where: {
        id: addressId,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo borrar la dirección.',
    };
  }
};
