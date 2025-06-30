import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { HeartOutlined, EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { IProduct } from "@/types/IProduct";
import { Link } from "react-router-dom";
import { colors } from "@/commons/colors";

const iconClassName = 'bg-white rounded-full shadow-md hover:bg-gray-100 size-7 cursor-pointer grid place-items-center transition-all duration-200 hover:scale-110';

export default function ProductRecommendations({ productId }: { productId: string }) {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`/services/api/products/${productId}/recommend`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [productId]);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://via.placeholder.com/300x400/f3f4f6/9ca3af?text=Không+có+ảnh';
    };

    if (loading) {
        return (
            <div className="mt-12 mb-8">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Gợi ý cho bạn</h3>
                    <p className="text-gray-600">Khám phá những sản phẩm tương tự</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                            <Skeleton.Image active className="w-full aspect-[3/4] rounded-lg mb-4" />
                            <Skeleton active paragraph={{ rows: 2 }} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!products.length) return null;

    return (
        <div className="mt-12 mb-8">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Gợi ý cho bạn</h3>
                <p className="text-gray-600">Khám phá những sản phẩm tương tự</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
                    >
                        <Link to={`/detail/${product._id}`} className="block">
                            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                                <img
                                    src={product.images?.[0] || 'https://via.placeholder.com/300x400/f3f4f6/9ca3af?text=Không+có+ảnh'}
                                    alt={product.name}
                                    onError={handleImageError}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* Action buttons */}
                                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <span className={iconClassName}>
                                        <HeartOutlined className="text-gray-600" />
                                    </span>
                                    <span className={iconClassName}>
                                        <EyeOutlined className="text-gray-600" />
                                    </span>
                                </div>

                                {/* Price badge */}
                                <div className="absolute bottom-3 left-3">
                                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                        {product.price?.toLocaleString()}₫
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                                    {product.name}
                                </h4>

                                {product.author && (
                                    <p className="text-sm text-gray-500 mb-1">Tác giả: {product.author}</p>
                                )}

                                {product.publisher && (
                                    <p className="text-sm text-gray-500">NXB: {product.publisher}</p>
                                )}

                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-lg font-bold text-red-600">
                                        {product.price?.toLocaleString()}₫
                                    </span>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 shadow-md">
                                        <ShoppingCartOutlined />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* View all recommendations button */}
            <div className="text-center mt-8">
                <Link
                    to="/products"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                    Xem tất cả sản phẩm
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
