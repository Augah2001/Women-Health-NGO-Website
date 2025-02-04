import { sendResetEmail } from '@/app/utils/lib';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest) {
  try {
    const { provinceCode } = await req.json();
    console.log(provinceCode)

    const province = await prisma.province.findFirst({
      where: { code: provinceCode }, // Assuming provinceName is a unique identifier
    });

    if (!province) {
      return NextResponse.json({ error: 'Province not found' }, { status: 404 });
    }

    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 3600000); // 1 hour expiration

    await prisma.province.update({
      where: { code: provinceCode },
      data: {
        resetToken,
        resetTokenExpires: expires,
      },
    });

    const resetLink = `${process.env.BASE_URL}/verify-reset?token=${resetToken}`;
    await sendResetEmail(process.env.RESET_EMAIL, resetLink);

    return NextResponse.json({ message: 'Reset email sent' }, { status: 200 });
  } catch (error) {
    console.error('Error handling password reset request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
