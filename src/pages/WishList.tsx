import { useFetch } from '@/hooks/useFetch'
import IWishList from '@/types/IWishList'
import { Heart, Loader2, AlertTriangle, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

const WishList = () => {
  const { data: products, error, loading } = useFetch<IWishList[]>('/favorites')

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <span className="ml-2">Đang tải...</span>
      </div>
    )

  if (error)
    return (
      <div className="flex justify-center items-center text-red-500 gap-2 py-10">
        <AlertTriangle className="w-5 h-5" />
        Lỗi khi tải dữ liệu
      </div>
    )

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Sản phẩm yêu thích</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {products?.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden relative group transition-transform hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={item?.thumbnail || item?.images?.[0]}
                alt={item?.name}
                className="w-120 h-160 object-cover"
              />
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                  <Heart className="w-5 h-5 text-red-500" />
                </button>
                <Link to={`/detail/${item._id}`}>
                  <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                    <Eye className="w-5 h-5 text-blue-500" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="p-3 space-y-1">
              <p className="text-base font-medium capitalize">{item?.name}</p>
              <p className="text-sm text-gray-500">{item?.author}</p>
              <p className="text-sm text-gray-500">{item?.publisher} • {item?.year}</p>
              <p className="text-red-600 font-semibold">
                ₫ {item?.price?.toLocaleString('vi-VN')}
              </p>
              <button className="mt-2 w-full bg-blue-600 text-white text-sm py-1 rounded hover:bg-blue-700 transition">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishList
