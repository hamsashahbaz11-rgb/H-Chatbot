import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", required: true
        },
        title: {
            type: String,
            default: "New Chat"
        }, // User can rename later
    },
    { timestamps: true }
);

// Avoid recompiling model in Next.js (important for hot reload)
export default mongoose.models.Conversation || mongoose.model("Conversation", ConversationSchema);
