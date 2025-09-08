import {  NextResponse } from "next/server";
import connectDB from "@/utils/db";
import User from "@/models/User";

// Create new user
export async function POST(req) {
  try {
    await connectDB();

    const { name, email, image } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists", user: existingUser }, { status: 200 });
    }

    // Create new user
    const user = await User.create({ email, name, image });

    return NextResponse.json({ message: "User created", user }, { status: 201 });
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}


// Update existing user preferences
export async function PATCH(req) {
  try {
    await connectDB();

    const {
      email,
      tone,
      detailLevel,
      language,
      interests,
      responseStyle,
      domainKnowledge,
      temperature,
    } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update preferences safely
    user.preferences.tone = tone ?? user.preferences.tone;
    user.preferences.detailLevel = detailLevel ?? user.preferences.detailLevel;
    user.preferences.language = language ?? user.preferences.language;
    user.preferences.interests = interests ?? user.preferences.interests;
    user.preferences.responseStyle = responseStyle ?? user.preferences.responseStyle;
    user.preferences.domainKnowledge = domainKnowledge ?? user.preferences.domainKnowledge;
    user.preferences.temperature = temperature ?? user.preferences.temperature;

    await user.save();

    return NextResponse.json({ message: "Preferences updated", user }, { status: 200 });
  } catch (error) {
    console.error("Failed to update preferences:", error);
    return NextResponse.json({ error: "Failed to update preferences" }, { status: 500 });
  }
}
