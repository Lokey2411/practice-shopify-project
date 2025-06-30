import { Request, Response } from 'express';
import Conversation from '../model/Conversation.Model';

// User gửi tin nhắn (hoặc bắt đầu chat)
export const userSendMessage = async (req: Request, res: Response) => {
    const { userId, content } = req.body;
    let conversation = await Conversation.findOne({ userId, status: 'open' });
    if (!conversation) {
        conversation = new Conversation({
            userId,
            messages: [{ sender: 'user', content, timestamp: new Date() }]
        });
    } else {
        conversation.messages.push({ sender: 'user', content, timestamp: new Date() });
    }
    await conversation.save();
    res.json(conversation);
};

// Admin trả lời
export const adminReply = async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const { content, adminId } = req.body;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) return res.status(404).json({ message: 'Not found' });
    conversation.adminId = adminId;
    conversation.messages.push({ sender: 'admin', content, timestamp: new Date() });
    await conversation.save();
    res.json(conversation);
};

// Lấy lịch sử chat
export const getConversation = async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    res.json(conversation);
};

// Lấy tất cả cuộc hội thoại (cho admin)
export const getAllConversations = async (req: Request, res: Response) => {
    const conversations = await Conversation.find().sort({ updatedAt: -1 });
    res.json(conversations);
}; 