import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import { IProduct } from "@/types/IProduct";
import { useState } from "react";
import { Rate, Skeleton, Button, notification } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import Http from "@/services/Api"; // Đảm bảo đã import Http

const DetailProduct = () => {
    const { id } = useParams();
    const { data: product } = useFetch<IProduct>(`/products/${id}`);
    const [selectedImage, setSelectedImage] = useState(0);
    const [api, contextHolder] = notification.useNotification();
    const [liked, setLiked] = useState(false);

    if (!product) return <Skeleton active />;
    const visibleThumbnails = product.images.slice(0, 4);

    // Hàm thêm vào giỏ hàng
    const addToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            const key = "add-to-cart";
            api.open({
                key,
                message: 'Thêm vào giỏ hàng...',
                description: `Thêm ${product.name} vào giỏ hàng của bạn.`,
            });

            const res = await Http.post('/carts', {
                products: [{ productId: product._id, quantity: 1 }],
                price: product.price,
                address: ''
            });

            if (res.status !== 200) {
                throw new Error('Lỗi khi thêm vào giỏ hàng');
            }

            api.open({
                key,
                message: 'Thêm giỏ hàng',
                description: `${product.name} đã thêm vào giỏ hàng.`,
            });
        } catch (error) {
            api.error({
                message: 'Failed to add',
                description: 'There was an issue adding the product.',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            {contextHolder}
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8 p-8">
                    {/* Ảnh sản phẩm */}
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        {/* Ảnh chính */}
                        <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                            <img
                                src={product.images[selectedImage]}
                                alt="Product"
                                className="max-h-full max-w-full object-contain transition-all duration-500"
                            />
                        </div>
                        {/* Thumbnails */}
                        <div className="flex gap-4 justify-center">
                            {visibleThumbnails.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`cursor-pointer w-20 h-20 p-1 border-2 rounded-xl overflow-hidden transition-all duration-300 ${selectedImage === index
                                        ? "border-blue-500"
                                        : "border-transparent hover:border-gray-300"
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumb ${index}`}
                                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Thông tin sản phẩm */}
                    <div className="w-full md:w-1/2 flex flex-col gap-6">
                        <div>
                            <h2 className="text-3xl font-semibold">{product.name}</h2>
                            <p className="text-xl text-red-500 font-bold mt-2">
                                {product.price.toLocaleString()}₫
                            </p>
                            <Rate allowHalf defaultValue={2.5} />
                        </div>
                        <div className="text-gray-700 space-y-1 text-sm">
                            <p>
                                <span className="font-medium">Tác giả:</span> {product.author}
                            </p>
                            <p>
                                <span className="font-medium">Nhà xuất bản:</span> {product.publisher}
                            </p>
                            <p>
                                <span className="font-medium">Ngày phát hành:</span> {product.publishedDate}
                            </p>
                            <p>
                                <span className="font-medium">Số trang:</span> {product.numPage}
                            </p>
                        </div>
                        {/* Nút thao tác */}
                        <div className="flex items-center gap-4 mt-4">
                            <Button
                                type="primary"
                                size="large"
                                className="rounded-xl bg-blue-600 hover:bg-blue-700 transition-transform duration-300 hover:scale-105"
                                onClick={addToCart}
                            >
                                Thêm vào giỏ hàng
                            </Button>
                            <Button
                                shape="circle"
                                icon={
                                    liked
                                        ? <HeartFilled style={{ color: '#ef4444' }} />
                                        : <HeartOutlined style={{ color: '#ef4444' }} />
                                }
                                onClick={() => setLiked(!liked)}
                                className="border-gray-300 transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;