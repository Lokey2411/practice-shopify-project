import React, { useEffect, useState, useRef } from 'react';
import { socket, sendAdminMessage, onAdminReceive } from '@/services/socket';


export type Message = {
    sender: string;
    content: string;
    timestamp: string | Date;
    userId: string;
};

type Conversation = {
    _id: string;
    userId: string;
    messages: Message[];
};

export default function ChatAdmin() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selected, setSelected] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Lấy danh sách hội thoại khi load trang
    useEffect(() => {
        fetch('/services/api/conversations')
            .then(res => res.json())
            .then(data => setConversations(data));
    }, []);

   
    useEffect(() => {
        if (selected) {
            fetch(`/services/api/conversations/${selected._id}`)
                .then(res => res.json())
                .then(data => setMessages(data.messages || []));
        }
    }, [selected]);


    useEffect(() => {
        const handler = (msg: Message) => {
            if (selected && msg.userId === selected.userId) {
                setMessages(prev => [...prev, msg]);
            }
        };
        onAdminReceive((msg: unknown) => {
            if (typeof msg === 'object' && msg !== null && 'sender' in msg && 'content' in msg && 'timestamp' in msg && 'userId' in msg) {
                handler(msg as Message);
            }
        });
        return () => {
            socket.off('admin-receive-message', handler);
        };
    }, [selected]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || !selected) return;
        const msg = { sender: 'admin', content: input, timestamp: new Date(), userId: selected.userId };
        sendAdminMessage(msg);
        setMessages(prev => [...prev, msg]);
        setInput('');
        // Gọi API lưu vào DB
        await fetch(`/services/api/conversations/admin/${selected._id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: input, adminId: 'adminId' }) // Thay adminId bằng id thực tế nếu có
        });
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar danh sách hội thoại */}
            <div className="w-1/4 border-r overflow-y-auto">
                <h2 className="p-4 font-bold">Hội thoại</h2>
                {conversations.map(conv => (
                    <div
                        key={conv._id}
                        className={`p-4 cursor-pointer hover:bg-gray-100 ${selected?._id === conv._id ? 'bg-gray-200' : ''}`}
                        onClick={() => setSelected(conv)}
                    >
                        User: {conv.userId}
                        <br />
                        {conv.messages?.[conv.messages.length - 1]?.content?.slice(0, 30)}...
                    </div>
                ))}
            </div>
            {/* Khung chat */}
            <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`mb-2 ${msg.sender === 'admin' ? 'text-right' : 'text-left'}`}>
                            <span className={`inline-block px-3 py-1 rounded-lg ${msg.sender === 'admin' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                                {msg.content}
                            </span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                {selected && (
                    <div className="p-2 border-t flex">
                        <input
                            className="flex-1 border rounded-l px-2 py-1"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                            placeholder="Nhập tin nhắn..."
                        />
                        <button className="bg-blue-600 text-white px-4 rounded-r" onClick={sendMessage}>Gửi</button>
                    </div>
                )}
            </div>
        </div>
    );
}
