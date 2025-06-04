import React, { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { IOrder } from '@/types/IOrder';
import Http from '@/services/Api';
import { message } from 'antd';
import CartItem from '@/components/CartItem';

const Cart = () => {
  const [refresh, setRefresh] = useState(false);
  const { data, loading } = useFetch<IOrder[]>('/carts');
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});


  useEffect(() => {

    if (Array.isArray(data)) {

      const allProducts = data.flatMap(order => order.products);
      const productQuantities = allProducts.reduce((obj, prd) => {
        obj[prd.productId] = prd.quantity;
        return obj;
      }, {} as { [id: string]: number });
      setQuantities(productQuantities);
    }
  }, [data]);

  if (loading) return <div className="text-center py-20 text-xl font-semibold">Đang tải...</div>;

  const cartItems = Array.isArray(data) ? data : [];

  // Tính tổng tiền dựa trên số lượng
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (quantities[item._id] || 1),
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // Xử lý tăng/giảm số lượng
  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const handleRemove = async (productId: string) => {
    try {
      await Http.delete('/carts', { data: { productId } });
      message.success('Xóa sản phẩm khỏi giỏ hàng thành công!');
      setRefresh(r => !r); // refetch lại giỏ hàng
      window.location.reload();
    } catch (err) {
      message.error('Xóa sản phẩm thất bại!');
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-pink-700 mb-10 text-center drop-shadow">Giỏ Sách/Truyện của bạn</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-10 text-center">
                <p className="text-gray-500 text-lg">Giỏ hàng của bạn đang trống.</p>
              </div>
            ) : (
              //ở đây t muốn hiển thị danh sách sao cho mỗi sản phẩm riêng 1 hàng mà ko có được 
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <CartItem
                    key={item._id}
                    {...item}
                    quantity={quantities[item._id] || 1}
                    onQuantityChange={(delta) => handleQuantityChange(item._id, delta)}
                    handleRemove={handleRemove}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 h-fit sticky top-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Tóm tắt đơn hàng</h2>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính</span>
                <span className="text-gray-800 font-semibold">{subtotal.toLocaleString()}₫</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thuế (10%)</span>
                <span className="text-gray-800 font-semibold">{tax.toLocaleString()}₫</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-xl font-bold text-blue-700">Tổng cộng</span>
                  <span className="text-xl font-bold text-pink-700">{total.toLocaleString()}₫</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-8 bg-pink-600 text-white py-3 rounded-xl text-lg font-bold hover:bg-pink-700 transition duration-300 shadow">
              Thanh toán ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;