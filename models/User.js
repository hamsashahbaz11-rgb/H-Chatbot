import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  image: String,
  preferences: {
    tone: { type: String, default: "friendly" },  // formal, casual, funny
    detailLevel: { type: String, default: "medium" }, 
    language: { type: String, default: "en" },     // en, ur, ar
    interests: { type: [String], default: [] },
    responseStyle: { type: String, default: "balanced" },
    domainKnowledge: { type: [String], default: [] },
    temperature: { type: Number, default: 0.7 },
  }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

