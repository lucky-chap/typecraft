import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request: Request) {
  //get request
  const { id } = await request.json();

  // get text from prisma
  const content = await prisma.typingContent.findUnique({
    where: {
      id: id,
    },
  });

  if (!content) {
    return Response.json({
      success: false,
      message: "Content not found",
    });
  }

  return Response.json({
    success: true,
    content: content.data,
  });
}
