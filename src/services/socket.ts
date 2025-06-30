import io from 'socket.io-client';

export type Message = {
    sender: string;
    content: string;
    timestamp: string | Date;
    userId: string;
};

export const socket = io('http://localhost:8000'); // Đúng port backend

export const sendUserMessage = (data: Message) => socket.emit('user-send-message', data);
export const onUserReceive = (cb: (msg: Message) => void) => socket.on('user-receive-message', cb);
