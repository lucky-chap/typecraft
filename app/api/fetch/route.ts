import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request: NextRequest, response: NextResponse) {
  //get request
  const { id } = await request.json();

  // get text from prisma
  const content = await prisma.typingContent.findUnique({
    where: {
      id: id,
    },
  });

  if (!content) {
    return NextResponse.json({
      success: false,
      message: "Content not found",
    });
  }

  return NextResponse.json(
    {
      success: true,
      content: content.data,
    },
    { status: 200 }
  );
}
