import { Router } from 'express';
import { userSendMessage, adminReply, getConversation, getAllConversations } from '../controller/conversation.controller';
import { asyncHandler } from '@/middleware/asyncHandler';

const conversation = Router();

conversation.post('/user', userSendMessage); // User gửi tin nhắn
conversation.post('/admin/:conversationId', asyncHandler(adminReply)); // Admin trả lời
conversation.get('/:conversationId', getConversation); // Lấy lịch sử chat
conversation.get('/', getAllConversations); // Admin lấy tất cả hội thoại

export default conversation;
