import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import { IProduct } from "@/types/IProduct";
import { useEffect, useState } from "react";
import { Skeleton, Rate, Form, Input, Button } from "antd";
import Image from "antd/es/image";
import Http from "@/services/Api";
import ProductRecommendations from "@/components/ProductRecommendations";

const DetailProduct = () => {
    const { id } = useParams<{ id: string }>();
    const { data: product } = useFetch<IProduct>(`/products/${id}`);
    const [selectedImage, setSelectedImage] = useState(0);
    const [form] = Form.useForm();
    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
        if (!product?._id) return;
        const fetchReviews = async () => {
            try {
                const res = await Http.get(`/reviews?productId=${product._id}`);
                setReviews(res.data.data);
            } catch (error) {
                // Xử lý lỗi nếu cần
            }
        };
        fetchReviews();
    }, [product?._id]);

    const handleSubmitReview = async (values: any) => {
        if (!product) return;
        try {
            await Http.post("/reviews", {
                productId: product._id,
                rating: values.rating,
                comment: values.comment,
            });
            form.resetFields();
            const res = await Http.get(`/reviews?productId=${product._id}`);
            setReviews(res.data.data);
        } catch (error: any) {
            // Xử lý lỗi nếu cần
        }
    };

    if (!product) return <Skeleton active />;
    const visibleThumbnails = product.images.slice(0, 4);

    return (
        <div className="relative min-h-screen py-10 px-2 overflow-x-hidden">
            <div className="max-w-6xl mx-auto bg-white/90 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-md border border-blue-100">
                <div className="flex flex-col md:flex-row gap-10 p-10">
                    {/* Ảnh sản phẩm */}
                    <div className="w-full md:w-1/2 flex flex-col gap-6 items-center">
                        <div className="relative w-full max-w-[380px] aspect-square bg-gradient-to-br from-blue-100 via-white to-pink-100 flex items-center justify-center rounded-2xl overflow-hidden shadow-xl border-4 border-blue-200 mx-auto">
                            <Image
                                src={product.images[selectedImage]}
                                alt="Product"
                                className="w-full h-full object-contain rounded-xl bg-white"
                                preview={true}
                            />
                        </div>
                        <div className="flex gap-4 justify-center mt-2">
                            {visibleThumbnails.map((img, index) => (
                                <button
                                    key={product._id + '-' + index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`cursor-pointer w-20 h-20 aspect-square p-1 border-2 rounded-xl overflow-hidden transition-all duration-200
                                        ${selectedImage === index
                                            ? 'border-pink-500 shadow-lg scale-110'
                                            : 'border-gray-200 hover:border-blue-300'
                                        }`}
                                    aria-label={`Chọn ảnh ${index + 1}`}
                                    tabIndex={0}
                                    style={{ background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Image
                                        src={img}
                                        alt={`Thumb ${index}`}
                                        className="w-full h-full object-contain rounded-lg"
                                        preview={false}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Thông tin sản phẩm */}
                    <div className="w-full md:w-1/2 flex flex-col gap-8">
                        <div>
                            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 mb-2">{product.name}</h2>
                        </div>
                        <div className="text-gray-700 space-y-2 text-base">
                            <p><span className="font-semibold">Tác giả:</span> {product.author}</p>
                            <p><span className="font-semibold">Nhà xuất bản:</span> {product.publisher}</p>
                            <p><span className="font-semibold">Ngày phát hành:</span> {product.publishedDate}</p>
                            <p><span className="font-semibold">Số trang:</span> {product.numPage}</p>
                        </div>
                        {/* Phần đánh giá */}
                        <div className="mt-8">
                            <h3 className="text-2xl font-bold mb-4 text-blue-700">Đánh giá sản phẩm</h3>
                            <Form layout="vertical" form={form} onFinish={handleSubmitReview}>
                                <Form.Item
                                    label="Số sao đánh giá"
                                    name="rating"
                                    rules={[{ required: true, message: "Vui lòng chọn số sao!" }]}
                                >
                                    <Rate allowHalf />
                                </Form.Item>
                                <Form.Item
                                    label="Nội dung đánh giá"
                                    name="comment"
                                    rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
                                >
                                    <Input.TextArea rows={4} placeholder="Nhận xét của bạn..." />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Gửi đánh giá
                                    </Button>
                                </Form.Item>
                            </Form>
                            {/* Hiển thị các đánh giá */}
                            <div className="mt-8 space-y-6">
                                <h3 className="text-xl font-semibold">Các đánh giá</h3>
                                {reviews.length === 0 && <p>Chưa có đánh giá nào.</p>}
                                {reviews.map((review, idx) => (
                                    <div key={review._id ?? idx} className="border-b pb-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-blue-600">
                                                {review.userId?.name ?? "Người dùng"}
                                            </span>
                                            <Rate disabled defaultValue={review.rating} />
                                        </div>
                                        <p className="text-gray-700 mt-2">{review.comment}</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(review.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductRecommendations productId={id!} />
        </div>
    );
};

export default DetailProduct;
