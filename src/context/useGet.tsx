import { useEffect, useState } from 'react';

/**
 * useGet - custom hook để gọi API và lưu dữ liệu.
 *
 * @param callback - Hàm gọi API trả về Promise<T>
 * @param onError - Hàm xử lý lỗi (tuỳ chọn)
 * @returns data: T | undefined, refetch: () => Promise<void>, loading: boolean
 */
export const useGet = <T = any>(
    callback: () => Promise<T>,
    onError?: (error: any) => void
): { data: T | undefined; refetch: () => Promise<void>; loading: boolean } => {
    const [data, setData] = useState<T | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await callback();
            setData(response);
        } catch (error) {
            setData(undefined);
            onError?.(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, refetch: fetchData, loading };
};
