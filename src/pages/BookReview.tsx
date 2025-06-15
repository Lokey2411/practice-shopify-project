import React, { useState, useEffect } from 'react';
import { Input, Button, Rate, notification } from 'antd';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BookReview = () => {
    const { id: productId } = useParams(); // Get productId from URL
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`/api/reviews?productId=${productId}`);
                const data = await response.json();
                if (data.message === 'success') {
                    setReviews(data.data);
                }
            } catch (error) {
                notification.error({
                    message: 'Lỗi',
                    description: 'Không thể tải đánh giá.',
                    duration: 3,
                });
            }
        };
        if (inView) fetchReviews();
    }, [productId, inView]);

    const handleSubmit = async () => {
        if (!rating || !comment.trim()) {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng nhập đủ số sao và bình luận trước khi gửi.',
                duration: 3,
            });
            return;
        }

        notification.info({
            message: 'Đang gửi...',
            description: 'Đang xử lý đánh giá của bạn.',
            duration: 2,
        });

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, userId: 'user123', rating: rating.toString(), comment }), // Replace 'user123' with actual userId
            });
            const data = await response.json();
            if (data.message === 'success') {
                notification.success({
                    message: 'Thành công',
                    description: 'Đánh giá của bạn đã được gửi thành công!',
                    duration: 3,
                });
                setRating(0);
                setComment('');
                setReviews([...reviews, { productId, userId: 'user123', rating, createdAt: new Date().toISOString() }]);
            } else {
                throw new Error('Failed to save review');
            }
        } catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Không thể gửi đánh giá. Vui lòng thử lại sau.',
                duration: 3,
            });
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeIn}
            className="p-6 bg-white rounded-lg shadow-md"
        >
            <h2 className="text-2xl font-bold mb-4">Đánh giá sách</h2>
            <div className="mb-4">
                <label className="block mb-2">Số sao:</label>
                <Rate value={rating} onChange={setRating} />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Bình luận:</label>
                <Input.TextArea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Viết đánh giá của bạn..."
                    rows={4}
                />
            </div>
            <Button
                type="primary"
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700"
            >
                Gửi đánh giá
            </Button>
            {reviews.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Đánh giá khác</h3>
                    {reviews.map((review, index) => (
                        <div key={index} className="p-4 border rounded-md mb-2">
                            <Rate value={parseInt(review.rating)} disabled />
                            <p className="mt-2">{review.comment || 'Không có bình luận'}</p>
                            <small className="text-gray-500">Đăng lúc: {new Date(review.createdAt).toLocaleString()}</small>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default BookReview;