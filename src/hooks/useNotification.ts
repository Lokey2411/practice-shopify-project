
import { NotificationContext } from '@/context/NotificationContex';
import { useContext } from 'react';

export const useNotification = () => {
    return useContext(NotificationContext);
};