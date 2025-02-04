import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/prisma/client';

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    const province = await prisma.province.findFirst({
      where: { resetToken: token },
    });

    // Check if province is null or if resetTokenExpires is past the current date
    if (!province || (province.resetTokenExpires && province.resetTokenExpires < new Date())) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await prisma.province.update({
      where: { id: province.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    return NextResponse.json({ message: 'Password successfully reset' }, { status: 200 });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
