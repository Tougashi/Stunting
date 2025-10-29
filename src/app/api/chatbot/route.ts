import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export async function POST(request: NextRequest) {
  const { message, userId } = await request.json();

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction:
        "Anda adalah asisten kesehatan yang membantu orang tua dalam memantau pertumbuhan anak mereka untuk mencegah stunting. Jawab pertanyaan dengan singkat, jelas, dan informatif untuk menjawab pertanyaan yang diajukan oleh orang tua terkait pencegahan stunting pada anak. Jika pertanyaannya di luar konteks pencegahan stunting, jawab dengan 'Maaf, saya hanya dapat membantu dengan pertanyaan terkait pencegahan stunting pada anak.",
    },
    contents: message,
  });

  const storeToDb = [
    {
      user_id: userId,
      content: message,
      role: "user",
    },
    {
      user_id: userId,
      content: response.text,
      role: "assistant",
    },
  ];

  const { error } = await supabase
    .from("Konsultasi")
    .insert(storeToDb)
    .select();

  if (error) {
    return NextResponse.json(
      {
        succcess: false,
        error: error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      succcess: true,
      data: response.text,
    },
    { status: 200 }
  );
}
