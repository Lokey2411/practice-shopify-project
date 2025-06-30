import { io } from 'socket.io-client';

export const socket = io('http://localhost:8000'); // Đúng port backend

export const sendAdminMessage = (data: unknown) => socket.emit('admin-send-message', data);
export const onAdminReceive = (cb: (msg: unknown) => void) => socket.on('admin-receive-message', cb);
