import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request: Request) {
  // send post request to this address https://api-lr.agent.ai/v1/agent/htr6xdsf4hwaf251/webhook/3bcebcf5

  const req = await fetch(
    "https://api-lr.agent.ai/v1/agent/htr6xdsf4hwaf251/webhook/3bcebcf5",
    {
      method: "POST",
    }
  );

  const data = {
    resource_to_use: "AI",
    ai_topic: "The Life Of Pablo",
    difficulty_level: "Easy",
    persona: "Philosopher",
    max_words: 60,
    order: "Left to right",
    url: "https://en.wikipedia.org/wiki/Theurgy",
  };

  let resultString = "";
  const formatted = () => {
    for (const [key, value] of Object.entries(data)) {
      resultString += `${key}: ${value}\n`;
    }
  };

  formatted();

  //   const res = await req.json();

  return Response.json(resultString);
}
