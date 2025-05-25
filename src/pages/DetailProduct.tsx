import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import { IProduct } from "@/types/IProduct";
import { useState } from "react";
import { Rate, Skeleton } from "antd";
import { HeartOutlined } from "@ant-design/icons";


const DetailProduct = () => {
    const { id } = useParams();
    const { data: products } = useFetch<IProduct>(`/products/${id}`);
    const product = products;

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("M");
    if (!product) return <Skeleton active />
    const visibleThumbnails = product?.images.slice(0, 4);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="flex gap-8 p-8">
                    <div className="w-1/2">
                        <img
                            src={product?.images[selectedImage]}
                            alt="Product"
                            className="rounded-xl w-full object-cover"
                        />
                        <div className="flex gap-2 mt-4">
                            {visibleThumbnails.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Thumbnail ${idx}`}
                                    className={`w-20 h-20 rounded-xl object-cover cursor-pointer border ${selectedImage === idx ? "border-blue-500" : "border-gray-300"
                                        }`}
                                    onClick={() => setSelectedImage(idx)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h1 className="text-2xl font-bold mb-2">{product?.name}</h1>
                        <p className="text-gray-500 mb-4">{product?.description}</p>
                        <div className="flex items-center gap-2 text-yellow-500 mb-4">
                            <Rate allowHalf defaultValue={2.5} />;
                            <span>{product?.rating}</span>
                            <span className="text-gray-400">({product?.sold} đã bán)</span>
                        </div>
                        <p className="text-2xl text-red-500 font-semibold mb-4">
                            {product?.price.toLocaleString()}₫
                        </p>

                        <div className="mb-4">
                            <label className="font-medium">Màu sắc:</label>
                            <div className="flex gap-2 mt-2">
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="font-medium">Kích cỡ:</label>
                            <select
                                className="mt-2 px-4 py-2 border rounded-md"
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                            >
                            </select>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <input
                                type="number"
                                value={quantity}
                                min={1}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-20 text-center border px-2 py-1 rounded"
                            />
                            <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                                Thêm vào giỏ
                            </button>
                            <HeartOutlined className="text-red-500 cursor-pointer" size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;
