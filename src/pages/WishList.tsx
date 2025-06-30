import React, { useEffect, useState } from 'react';
import { notification, Badge, Empty } from 'antd';
import Http from '@/services/Api';
import { motion, AnimatePresence } from 'framer-motion';
import { useApi } from '@/context/ApiContext';
import { HeartFilled, DeleteOutlined } from '@ant-design/icons';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  author: string;
  publisher: string;
  publishedDate: string;
  numPage: number;
  ProductId?: any;
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const { refetchWishlist } = useApi();
  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const res = await Http.get('/favorites');
      if (res.status === 200 && res.data.data) {
        // Lọc sản phẩm trùng lặp theo _id
        const uniqueItems = res.data.data.filter(
          (item: Product, index: number, self: Product[]) =>
            index === self.findIndex((p: Product) => p._id === item._id)
        );
        setWishlistItems(uniqueItems);
      } else {
        api.error({
          message: 'Lỗi',
          description: 'Không thể tải danh sách yêu thích.',
        });
      }
    } catch (error) {
      api.error({
        message: 'Lỗi kết nối',
        description: 'Không thể kết nối đến server.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: string, productName: string) => {
    if (removingId === productId) return;
    setRemovingId(productId);
    try {
      const res = await Http.delete(`/favorites/${productId}`);
      if (res.status === 200) {
        api.success({
          message: 'Đã xóa khỏi yêu thích',
          description: `Đã xóa "${productName}" khỏi danh sách yêu thích.`,
        });
        await refetchWishlist();
      } else {
        throw new Error('Xóa thất bại');
      }
    } catch (error) {
      api.error({
        message: 'Lỗi',
        description: 'Không thể xoá sản phẩm khỏi danh sách.',
      });
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    fetchWishlist();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 py-10 px-2 sm:px-6 lg:px-8">
      {contextHolder}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-blue-700 drop-shadow flex items-center gap-3"
          >
            <HeartFilled className="text-pink-500 text-3xl animate-bounce" />
            Danh sách yêu thích
            <Badge count={wishlistItems.length} offset={[10, 0]} className="ml-2">
              <span></span>
            </Badge>
          </motion.h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <span className="text-lg text-blue-500 animate-pulse">Đang tải danh sách...</span>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <Empty
              description={<span className="text-lg text-gray-500">Bạn chưa có sản phẩm yêu thích nào.</span>}
              imageStyle={{ height: 80 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-6 text-pink-500 text-2xl font-bold animate-bounce"
            >
              Hãy thêm sản phẩm bạn thích nhé!
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            <AnimatePresence>
              {wishlistItems.map((item, index) => {
                const price = typeof item.price === 'number' && !isNaN(item.price)
                  ? item.price
                  : item.ProductId && typeof item.ProductId.price === 'number'
                    ? item.ProductId.price
                    : null;
                const image = item.images?.[0] || item.ProductId?.image || '';
                return (
                  <motion.div
                    key={item._id}
                    custom={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30, transition: { duration: 0.3 } }}
                    whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
                    className="bg-white rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative mb-4">
                      {image ? (
                        <img
                          src={image}
                          alt={item.name}
                          className="w-full h-64 object-cover rounded-xl border border-blue-100 shadow-sm"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                          Không có ảnh
                        </div>
                      )}
                      <HeartFilled className="absolute top-3 right-3 text-pink-500 text-2xl animate-pulse" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">Tác giả: <span className="font-medium text-blue-700">{item.author || item.ProductId?.author || 'N/A'}</span></p>
                        <p className="text-sm text-gray-600 mb-1">Nhà xuất bản: <span className="font-medium">{item.publisher || item.ProductId?.publisher || 'N/A'}</span></p>
                        <p className="text-sm text-gray-600 mb-1">
                          Năm xuất bản: <span className="font-medium">{item.publishedDate || item.ProductId?.publishedDate || 'N/A'}</span>, {item.numPage || item.ProductId?.numPage || 'N/A'} trang
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xl font-bold text-pink-600">
                          {price !== null ? price.toLocaleString() + '₫' : 'N/A'}
                        </span>
                        <button
                          onClick={() => handleRemoveFromWishlist(item._id, item.name)}
                          disabled={removingId === item._id}
                          className="ml-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg shadow hover:from-pink-600 hover:to-blue-600 transition-all flex items-center gap-2"
                        >
                          <DeleteOutlined />
                          Xoá
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
