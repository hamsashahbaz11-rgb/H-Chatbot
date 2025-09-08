import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true
        },
        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true
        }, // who sent it
        content: {
            type: String,
            required: true
        }
        , // actual message
    },
    { timestamps: true }
);

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
