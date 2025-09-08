import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import Conversation from "@/models/Conversation";
import { URL } from "url";
import Message from "@/models/Message";

export async function POST(req) {
  try {
    await connectDB();

    const { userId, title } = await req.json();

    if (!userId || !title) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const conversation = await Conversation.create({
      userId,
      title,
    });

    if (!conversation) {
      return NextResponse.json(
        { message: "Could not store conversation details" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Conversation details stored successfully", conversation },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in storing conversation", error);
    return NextResponse.json(
      { message: "Could not store conversation details", error },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    if (!userId) {
      const conversationId = url.searchParams.get("conversationId");
      if (!conversationId) {
        return NextResponse.json({ message: "conversationId could not found" }, { status: 404 })
      }
      if (conversationId) {
        const conversation = await Message.find({ conversationId, role: "user" });
        const contentOfConversation = conversation.map(conversation => conversation.content)
        if (!conversation) {
          return NextResponse.json({ message: "Conversation not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Conversation found Successfully", contentOfConversation }, { status: 200 })

      }
      return NextResponse.json({ message: "User Info not found" }, { status: 500 })
    }
    const conversations = await Conversation.find({ userId })

    if (!conversations) {
      return NextResponse.json({ message: "Conversations not found" }, {
        status: 500
      })
    }

    return NextResponse.json({ message: "Conversations found Successfully", conversations }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Could not Get Conversations Try again" }, { status: 404 })
  }

}

export async function DELETE(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const conversationId = url.searchParams.get("conversationId");
    if (!conversationId) {
      return NextResponse.json({ message: "conversationId could not found" }, { status: 404 })
    }
    const conversation = await Conversation.findByIdAndDelete(conversationId)
    if (!conversation) {
      return NextResponse.json({ message: "Conversation Could not delete" }, { status: 400 })

    }

    return NextResponse.json({ message: "Conversation Deleted successfully!" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Conversation could not delete!" }, { status: 2500 })
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { conversationId, title } = await req.json();

    if (!conversationId || !title) {
      return NextResponse.json({ message: "Could not find Credentials" }, { status: 404 })
    }

    const conversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { title }, // update object
      { new: true } 
    );

    if (!conversation) {
      return NextResponse.json({ message: "Could not find conversation" }, { status: 404 })
    }
    return NextResponse.json({ message: "Conversation Updated Successfully", conversation }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: "Could not update conversation" }, { status: 404 })
  }
}