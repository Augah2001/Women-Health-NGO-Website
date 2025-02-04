import { NextRequest, NextResponse } from "next/server";
import validate, { drugInfoSchema } from "../../validate";
import prisma from "../../../../prisma/client";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const drugInfo = await prisma?.drugInfo.findFirst({
    where: { id: parseInt(id) },
  });

  if (!drugInfo)
    return NextResponse.json({ error: "Drug not found" }, { status: 404 });

  return NextResponse.json(drugInfo);
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const myId = parseInt(id);

  if (isNaN(myId)) {
    return NextResponse.json({ error: "Invalid Drug ID" }, { status: 400 });
  }

  const drugInfo = await prisma?.drugInfo.findFirst({
    where: { id: myId },
  });

  if (!drugInfo) {
    return NextResponse.json({ error: "Drug not found" }, { status: 404 });
  }

  const deletedDrug = await prisma?.drugInfo.delete({
    where: { id: myId },
  });

  return NextResponse.json(deletedDrug);
}

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await request.json();

  if (isNaN(parseInt(id))) {
    return NextResponse.json({ error: "Invalid Drug ID" }, { status: 400 });
  }

  const validateBody = validate(drugInfoSchema, body);

  if (!validateBody.success) {
    return NextResponse.json(
      { error: validateBody.error.errors },
      { status: 400 }
    );
  }

  const updatedDrug = await prisma?.drugInfo.update({
    where: { id: parseInt(id) },
    data: validateBody.data,
  });

  if (!updatedDrug) {
    return NextResponse.json({ error: "Drug not found" }, { status: 404 });
  }

  return NextResponse.json(updatedDrug);
}
