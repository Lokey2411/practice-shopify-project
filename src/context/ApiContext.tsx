import { useFetch } from '@/hooks/useFetch';
import { useGet } from '@/hooks/useGet';
import makeRequest from '@/services/makeRequest';
import ProductService from '@/services/ProductsService';
import UserService from '@/services/UserService';
import { IMessage } from '@/types/IMessage';
import { IOrder } from '@/types/IOrder';
import { IProduct } from '@/types/IProduct';
import { IUser } from '@/types/IUser';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type ContextType = {
    sessionId: string;
    allProducts: IProduct[];
    wishlist: any[];
    orders: any[];
    userProfile: IUser;
    chatMessages: IMessage[];
    handleAddChatMessage: (message: IMessage) => void;
    handleRemoveMessage: (message: IMessage) => void;
    refetchProfile: () => Promise<void>;
    refetchProducts: () => Promise<void>;
    refetchWishlist: () => Promise<void>;
    refetchOrders: () => Promise<void>;
    refetchCart: () => Promise<void>;
    isMessaging: boolean;
    cart: IOrder[];
    cartLoading: boolean;
};

const GlobalApiContext = createContext({} as ContextType);

export const useApi = () => useContext(GlobalApiContext);

const DEFAULT_MESSAGE: IMessage = {
    id: 0,
    question: '',
    answer: 'Hello there, how can I help you?',
    sessionId: '',
    created_at: '',
};

export const GlobalApiContextProvider = ({ children }: PropsWithChildren) => {
    const [sessionId, setSessionId] = useState('');
    const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
    const { data: allProducts, refetch: refetchProducts } = useGet<IProduct[]>(ProductService.getProducts);
    const { data: wishlist, refetch: refetchWishlist } = useGet(UserService.getFavorite);
    const { data: orders, refetch: refetchOrders } = useGet<any[]>(UserService.getCart);
    const { data: userProfile, refetch: refetchProfile } = useGet<IUser>(UserService.getProfile);
    const [isMessaging, setIsMessaging] = useState(false);
    const [cart, setCart] = useState<IOrder[]>([]);
    const [cartLoading, setCartLoading] = useState(true);
    const [cartRefreshTrigger, setCartRefreshTrigger] = useState(0);

    const tokenIsValid = !!localStorage.getItem('token');

    // Function để refresh cart data
    const refetchCart = async () => {
        setCartLoading(true);
        try {
            const res = await makeRequest.get('/carts');
            if (res.status === 200) {
                setCart(res.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            setCart([]);
        } finally {
            setCartLoading(false);
        }
    };

    // Effect để fetch cart data khi có thay đổi
    useEffect(() => {
        if (tokenIsValid) {
            refetchCart();
        } else {
            setCart([]);
            setCartLoading(false);
        }
    }, [tokenIsValid, cartRefreshTrigger]);

    const refetchMessage = () => {
        makeRequest
            .get('/users/chat', { data: { sessionId } })
            .then(res => {
                if (res.status === 200) {
                    setChatMessages([DEFAULT_MESSAGE, ...res.data]);
                }
            })
            .catch(console.error);
    };
    useEffect(() => {
        const newSessionId = uuidv4();
        if (tokenIsValid) {
            setSessionId('');
            localStorage.removeItem('sessionId');
        } else {
            setSessionId(newSessionId);
            localStorage.setItem('sessionId', newSessionId);
        }
    }, [tokenIsValid]);
    useEffect(() => {
        if (!tokenIsValid && !sessionId) {
            setChatMessages([]);
            return;
        }
        refetchMessage();
    }, [tokenIsValid]);
    const handleAddChatMessage = (message: IMessage) => {
        setIsMessaging(true);
        makeRequest
            .post('/chat', message)
            .then(() => {
                refetchMessage();
            })
            .catch(console.error)
            .finally(() => {
                setIsMessaging(false);
            });
    };
    const handleRemoveMessage = (message: IMessage) => {
        setIsMessaging(true);
        makeRequest
            .delete('/chat/' + message.id)
            .then(() => {
                refetchMessage();
            })
            .catch(console.error)
            .finally(() => {
                setIsMessaging(false);
            });
    };
    const contextValue = useMemo(
        () => ({
            allProducts: allProducts || [],
            wishlist: (wishlist as { data?: any[] })?.data || [],
            orders: (orders as { data?: any[] })?.data || [],
            refetchProducts,
            refetchWishlist,
            refetchOrders,
            refetchCart,
            userProfile,
            refetchProfile,
            sessionId,
            chatMessages,
            handleAddChatMessage,
            handleRemoveMessage,
            isMessaging,
            cart: cart || [],
            cartLoading,
        }),
        [allProducts, wishlist, orders, userProfile, chatMessages, isMessaging, cart, cartLoading, refetchCart]
    );
    return <GlobalApiContext.Provider value={contextValue}>{children}</GlobalApiContext.Provider>;
};