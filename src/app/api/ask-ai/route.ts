import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Set this in .env.local!

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: `You are a professional doctor. Answer shortly, clearly and in simple words: ${question}` },
            ],
          },
        ],
      }
    );

    const answer = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No answer found.';
    return NextResponse.json({ answer });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ answer: 'Error connecting to AI.' }, { status: 500 });
  }
}
