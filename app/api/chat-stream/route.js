

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

import { searchGoogle,searchWeather,searchCurrency   } from "@/lib/searchGoogle";  

import { 
  searchGoogleDeclaration, 
  searchWeatherDeclaration,
  searchCurrencyDeclaration
} from "@/lib/geminiTools";

const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(request) {
  try {
    const { message, user, conversation } = await request.json(); 
    if (!message || !user) {
      return NextResponse.json({ error: "Message and User is required" }, { status: 400 });
    }

    const userName = user.userId.name;
    const userPreferences = user.userId.preferences;

    const systemInstruction = `
You are an AI assistant for user **${userName.trim()}**. 
Preferences:
- Tone: ${userPreferences.tone}
- Detail Level: ${userPreferences.detailLevel}
- Style: ${userPreferences.responseStyle}
- Language: ${userPreferences.language}
- Interests: ${userPreferences.interests?.join(", ")}
- Domain Knowledge: ${userPreferences.domainKnowledge?.join(", ")}
- Creativity: ${userPreferences.temperature}

Conversation Context: ${conversation || "New Chat"}
Always reply in the same language as the input.
Use some Amazing Emojis to Enhance the Conversation in the response.
Make your response as precise as you can.
Every New key point should start from Emoji.
`;

    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      tools: [{ functionDeclarations: [searchGoogleDeclaration, searchWeatherDeclaration, searchCurrencyDeclaration] }],
      toolConfig: { functionCallingConfig: { mode: "AUTO" } },
      systemInstruction,
    });

    const encoder = new TextEncoder();
    const chat = model.startChat({
      generationConfig: { temperature: userPreferences.temperature ?? 0.7 },
    });

    const readable = new ReadableStream({
      async start(controller) {
        try {
          const result = await chat.sendMessageStream(message);

          for await (const chunk of result.stream) {
            const candidate = chunk.candidates?.[0];
            if (!candidate) continue;

            const part = candidate.content?.parts?.[0];
            if (!part) continue;

            // 🔹 Normal text
            if (part.text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: part.text })}\n\n`)
              );
            }

            // 🔹 Function calls
            if (part.functionCall) {
              const fnName = part.functionCall.name;
              const args = part.functionCall.args;

              try {
                let toolResponse;

                if (fnName === "searchGoogle") {
                  toolResponse = await searchGoogle(args.query);
                }

                if (fnName === "searchWeather") {
                  toolResponse = await searchWeather(args.query);
                }

                if (fnName === "searchCurrency") {
                  toolResponse = await searchCurrency(args.currency);
                }

                if (toolResponse) {
                  await handleToolResponse(fnName, toolResponse, chat, encoder, controller);
                }

              } catch (toolError) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ error: fnName + " function failed"})}\n\n`)
                );
              }
            }
          }

          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        } catch (err) { 
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: "Stream processing failed", err })}\n\n`)
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

  } catch (error) { 
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

// 🔧 Helper to send tool results back into Gemini
async function handleToolResponse(fnName, toolResponse, chat, encoder, controller) {
  const functionResult = await chat.sendMessageStream([
    {
      functionResponse: {
        name: fnName,
        response: {
          name: fnName,
          content: [{ parts: [{ text: JSON.stringify(toolResponse) }] }]
        },
      },
    },
  ]);

  for await (const responseChunk of functionResult.stream) {
    const responsePart = responseChunk.candidates?.[0]?.content?.parts?.[0];
    if (responsePart?.text) {
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ text: responsePart.text })}\n\n`)
      );
    }
  }
}
