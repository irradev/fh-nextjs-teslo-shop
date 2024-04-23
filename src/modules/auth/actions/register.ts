'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

interface Props {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({ name, email, password }: Props) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        // estos campos ya los tenemos en el formulario
        // name: true,
        // email: true
      },
    });

    return {
      ok: true,
      message: 'Usuario creado',
      user: user,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo crear el usuario.',
    };
  }
};
