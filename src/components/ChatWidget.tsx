import React, { useState, useEffect, useRef } from 'react';
import { socket, sendUserMessage, onUserReceive, Message } from '@/services/socket';
import { FaRegCommentDots, FaTimes } from 'react-icons/fa';

interface ChatWidgetProps {
    userId: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ userId }) => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open && userId) {
            fetch(`/services/api/conversations/${userId}`)
                .then(res => res.json())
                .then(data => setMessages(data.messages || []));
        }
    }, [open, userId]);


    useEffect(() => {
        const handler = (msg: Message) => {
            setMessages(prev => [...prev, msg]);
        };
        onUserReceive(handler);
        return () => {
            socket.off('user-receive-message', handler);
        };
    }, []);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const msg: Message = { sender: 'user', content: input, timestamp: new Date(), userId };
        sendUserMessage(msg);
        setMessages(prev => [...prev, msg]);
        setInput('');

        await fetch('/services/api/conversations/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, content: input })
        });
    };


    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            {!open && (
                <button
                    className="fixed bottom-6 right-6 z-[9999] bg-red-600 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center hover:bg-red-700 transition-all"
                    onClick={() => setOpen(true)}
                >
                    <FaRegCommentDots size={28} />
                </button>
            )}

            {/* Hộp chat */}
            {open && (
                <div
                    className="w-80 max-w-[90vw] h-[480px] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 animate-fadeIn"
                    style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)' }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-t-2xl">
                        <div className="flex items-center gap-2">
                            <FaRegCommentDots size={22} className="text-white" />
                            <span className="text-white font-bold text-lg">Hỗ trợ trực tuyến</span>
                        </div>
                        <button
                            className="text-white hover:bg-white/20 rounded-full p-1 transition"
                            onClick={() => setOpen(false)}
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>
                    {/* Nội dung chat */}
                    <div className="flex-1 overflow-y-auto px-3 py-2 bg-gray-50">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-400 mt-8">Chưa có tin nhắn nào...</div>
                        )}
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow
                                        ${msg.sender === 'user'
                                            ? 'bg-blue-500 text-white rounded-br-md'
                                            : 'bg-gray-200 text-gray-800 rounded-bl-md'
                                        }`}
                                >
                                    {msg.content}
                                    <div className="text-[10px] text-right text-white/70 mt-1">
                                        {msg.sender === 'user' ? 'Bạn' : 'CSKH'}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    {/* Nhập tin nhắn */}
                    <div className="p-3 border-t bg-white rounded-b-2xl flex gap-2">
                        <input
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            placeholder="Nhập tin nhắn..."
                        />
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-2 font-semibold transition"
                            onClick={sendMessage}
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
