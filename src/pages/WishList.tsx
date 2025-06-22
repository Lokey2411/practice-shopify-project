import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import Http from '@/services/Api';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewPopup from '@/components/ReviewPopUp'; // Import component mới

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  author: string;
  publisher: string;
  publishedDate: string;
  numPage: number;
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchWishlist = async () => {
    try {
      const res = await Http.get('/favorites');
      if (res.status === 200 && res.data.data) {
        setWishlistItems(res.data.data);
      } else {
        api.error({
          message: 'Lỗi',
          description: 'Không thể tải danh sách yêu thích.',
        });
      }
    } catch (error) {
      console.error('Fetch wishlist error:', error);
      api.error({
        message: 'Lỗi kết nối',
        description: 'Không thể kết nối đến server.',
      });
    }
  };

  const handleRemoveFromWishlist = async (productId: string, productName: string) => {
    try {
      const res = await Http.delete('/favorites', { data: { productId } });
      if (res.status === 200) {
        api.success({
          message: 'Đã xóa khỏi yêu thích',
          description: `Đã xóa "${productName}" khỏi danh sách yêu thích.`,
        });
        fetchWishlist();
      } else {
        throw new Error('Xóa thất bại');
      }
    } catch (error) {
      console.error('Remove error:', error);
      api.error({
        message: 'Lỗi',
        description: 'Không thể xóa sản phẩm khỏi danh sách.',
      });
    }
  };

  const handleOpenReview = (product: Product) => {
    setSelectedProduct(product);
    setIsReviewOpen(true);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
    hover: {
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    tap: { scale: 0.95 },
    transition: { duration: 0.2 },
  };

  return (
    <>
      {contextHolder}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8 text-center text-gray-800"
          >
            Danh sách yêu thích
          </motion.h2>

          {wishlistItems.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-gray-600 text-lg bg-white p-6 rounded-lg shadow-md"
            >
              Bạn chưa có sản phẩm yêu thích nào.
            </motion.p>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <AnimatePresence>
                {wishlistItems.map((item, index) => (
                  <motion.div
                    key={item._id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative">
                      {item.images && item.images.length > 0 && (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-64 object-cover rounded-t-lg"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">Tác giả: {item.author}</p>
                      <p className="text-sm text-gray-600">Nhà xuất bản: {item.publisher}</p>
                      <p className="text-sm text-gray-600">
                        Năm xuất bản: {item.publishedDate}, {item.numPage} trang
                      </p>
                      <p className="text-xl font-bold text-red-600 mt-2">đ {item.price.toLocaleString()}</p>
                      <div className="mt-4 space-y-2">
                        <motion.button
                          variants={buttonVariants}
                          whileTap="tap"
                          onClick={() => handleRemoveFromWishlist(item._id, item.name)}
                          className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                        >
                          Xoá khỏi yêu thích
                        </motion.button>
                        <button
                          onClick={() => handleOpenReview(item)}
                          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
                        >
                          Đánh giá sản phẩm
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
      <ReviewPopup
        productId={selectedProduct?._id || ''}
        productName={selectedProduct?.name || ''}
        visible={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
      />
    </>
  );
};

export default Wishlist;