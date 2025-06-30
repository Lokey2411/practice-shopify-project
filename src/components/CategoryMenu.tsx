import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Http from "@/services/Api";

interface Category {
    _id: string;
    name: string;
    image?: string;
    description?: string;
    isNewArrival?: boolean;
}

const CategoryMenu = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await Http.get("/categories");
                setCategories(res.data.data);
            } catch (err) {
                // Xử lý lỗi nếu cần
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 p-2 min-w-[260px] max-w-xs">
            <ul className="divide-y divide-blue-50">
                {categories.map((cat, idx) => (
                    <li
                        key={cat._id}
                        className={`flex items-center gap-3 p-3 cursor-pointer rounded-xl transition-all duration-200 group 
                            ${activeIndex === idx ? "bg-gradient-to-r from-blue-50 to-purple-50 shadow-md" : "hover:bg-blue-50"}`}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onMouseLeave={() => setActiveIndex(null)}
                        onClick={() => navigate(`/products?category=${cat._id}`)}
                    >
                        {/* Category image or icon */}
                        {cat.image ? (
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-10 h-10 object-cover rounded-xl border border-blue-100 shadow-sm bg-gray-50"
                            />
                        ) : (
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 text-blue-500 font-bold text-lg shadow-sm">
                                {cat.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-800 group-hover:text-blue-600 truncate">{cat.name}</span>
                                {cat.isNewArrival && (
                                    <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold shadow">Mới</span>
                                )}
                            </div>
                            {cat.description && (
                                <div className="text-xs text-gray-400 truncate mt-0.5">{cat.description}</div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryMenu;
