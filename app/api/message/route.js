import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Message from "@/models/Message";

export async function POST(req) {
  try {
    await connectDB();

    const { content, role, conversationId } = await req.json();

    if (!content || !role || !conversationId) {
      return NextResponse.json(
        { message: "Could not receive message" },
        { status: 400 } // 400 = bad request
      );
    }

    const messageCount = await Message.countDocuments({ conversationId });

    if (messageCount > 25) {
      
      return NextResponse.json(
        { message: "You have reached the message limit" },
        { status: 400 }
      );
    }

    const dbMessage = await Message.create({
      conversationId,
      role,
      content,
    });

    if (!dbMessage) {
      return NextResponse.json(
        { message: "Could not store message" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message Stored Successfully", data: dbMessage },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in Message/route.js", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const conversationId = url.searchParams.get("conversationId");
    
    if (!conversationId) {
      return NextResponse.json({ message: "conversationId could not found" }, { status: 404 })
    }


    const messages = await Message.find({ conversationId });
    if (!messages) {
      return NextResponse.json({ message: "Chat is empty" }, { status: 404 })
    }


    return NextResponse.json({ message: "Messages found Successfully", messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Could not Get Messages Try again" }, { status: 404 })
  }
}