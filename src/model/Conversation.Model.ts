import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
    sender: 'user' | 'admin';
    content: string;
    timestamp: Date;
}

export interface IConversation extends Document {
    userId: mongoose.Types.ObjectId;
    adminId?: mongoose.Types.ObjectId;
    messages: IMessage[];
    status: 'open' | 'closed';
}

const MessageSchema = new Schema<IMessage>({
    sender: { type: String, enum: ['user', 'admin'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const ConversationSchema = new Schema<IConversation>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    adminId: { type: Schema.Types.ObjectId, ref: 'User' },
    messages: [MessageSchema],
    status: { type: String, enum: ['open', 'closed'], default: 'open' }
}, { timestamps: true });

export default mongoose.model<IConversation>('Conversation', ConversationSchema);
