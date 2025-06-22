import React, { useState, useEffect } from 'react';
import { Modal, Rate, Input, Button, notification } from 'antd';
import { motion } from 'framer-motion';
import Http from '@/services/Api';

interface ReviewPopupProps {
    productId: string;
    productName: string;
    visible: boolean;
    onClose: () => void;
}

const ReviewPopup: React.FC<ReviewPopupProps> = ({ productId, productName, visible, onClose }) => {
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [reviewStats, setReviewStats] = useState<{ [key: number]: number }>({});
    const [api, contextHolder] = notification.useNotification();

    // Fetch review stats
    const fetchReviewStats = async () => {
        try {
            const res = await Http.get('/reviews', { params: { productId } });
            if (res.status === 200 && res.data.data) {
                const reviews = res.data.data;
                const stats = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
                reviews.forEach((review: any) => {
                    const rate = Math.round(Number(review.rating));
                    if (stats[rate]) stats[rate]++;
                });
                setReviewStats(stats);
            }
        } catch (error) {
            console.error('Fetch review stats error:', error);
        }
    };

    useEffect(() => {
        if (visible) {
            fetchReviewStats();
        }
    }, [visible]);

    const handleSubmitReview = async () => {
        if (!rating) {
            api.error({ message: 'Lỗi', description: 'Vui lòng chọn số sao.' });
            return;
        }

        try {
            const res = await Http.post('/reviews', { productId, rating: rating.toString(), comment });
            if (res.status === 201) {
                api.success({
                    message: 'Thành công',
                    description: `Đã thêm đánh giá cho "${productName}". Nhận 5.000 F-Point!`,
                });
                fetchReviewStats(); // Cập nhật stats
                setRating(0);
                setComment('');
                onClose();
            }
        } catch (error) {
            api.error({ message: 'Lỗi', description: 'Không thể gửi đánh giá.' });
        }
    };

    // Animation variants
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
    };

    const starVariants = {
        hover: { scale: 1.2, color: '#ffcc00' },
        tap: { scale: 0.9 },
    };

    return (
        <>
            {contextHolder}
            <Modal
                open={visible}
                onCancel={onClose}
                footer={null}
                closable={false}
                centered
                className="custom-review-modal"
            >
                <motion.div
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-6 bg-white rounded-lg shadow-2xl"
                >
                    <h2 className="text-xl font-bold text-center mb-4">Mở tài sản phẩm</h2>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-blue-600 font-semibold">VIỆT DÁNH GIÁ SẢN PHẨM</span>
                        <span className="text-yellow-500">Tăng 5.000 F-Point</span>
                    </div>
                    <div className="text-center mb-4">
                        <p className="text-gray-600">Mã sản phẩm: {productId}</p>
                        <motion.div whileHover="hover" whileTap="tap" variants={starVariants}>
                            <Rate value={rating} onChange={setRating} />
                        </motion.div>
                    </div>
                    <Input.TextArea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Viết bình luận của bạn..."
                        className="mb-4 border-dashed border-2 border-pink-200 p-2 rounded"
                        autoSize={{ minRows: 3, maxRows: 6 }}
                    />
                    <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">Đánh giá của bạn</h3>
                        {Object.keys(reviewStats).map((star) => (
                            <div key={star} className="flex justify-between text-sm">
                                <span>{star} sao</span>
                                <span>{reviewStats[star] || 0} đánh giá ({((reviewStats[star] || 0) / (Object.values(reviewStats).reduce((a, b) => a + b, 0) || 1) * 100).toFixed(0)}%)</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button onClick={onClose} className="bg-gray-300 text-black">
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSubmitReview}
                            className="bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                        >
                            Gửi đánh giá
                        </Button>
                    </div>
                </motion.div>
            </Modal>
        </>
    );
};

export default ReviewPopup;