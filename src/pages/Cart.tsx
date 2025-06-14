import React, { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { IOrder } from '@/types/IOrder';
import Http from '@/services/Api';
import { message } from 'antd';
import CartItem from '@/components/CartItem';
import DeleteButton from '@/components/DeleteButton';

const Cart = () => {
  const [refresh, setRefresh] = useState(false);
  const { data, loading } = useFetch<IOrder[]>('/carts');
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
  const [productPrices, setProductPrices] = useState<{ [id: string]: number }>({});
  const [productDetails, setProductDetails] = useState<{ [id: string]: { name: string, image: string } }>({});


  const allProducts = Array.isArray(data)
    ? data.flatMap(order => order.products)
    : [];


  useEffect(() => {
    if (Array.isArray(data)) {
      const productQuantities = allProducts.reduce((obj, prd) => {
        obj[prd.productId] = prd.quantity;
        return obj;
      }, {} as { [id: string]: number });
      setQuantities(productQuantities);
    }
  }, [data]);

  useEffect(() => {
    const fetchDetails = async () => {
      const prices: { [id: string]: number } = {};
      const details: { [id: string]: { name: string, image: string } } = {};
      await Promise.all(
        allProducts.map(async prd => {
          try {
            const res = await Http.get(`/products/${prd.productId}`);
            const data = res.data?.data || {};
            prices[prd.productId] = Number(String(data.price).replace(/[^\d]/g, '')) || 0;
            details[prd.productId] = {
              name: data.name || '',
              image: data.images?.[0] || '',
            };
          } catch {
            prices[prd.productId] = 0;
            details[prd.productId] = { name: '', image: '' };
          }
        })
      );
      setProductPrices(prices);
      setProductDetails(details);
    };
    if (allProducts.length > 0) fetchDetails();
  }, [allProducts.length]);

  if (loading) return <div className="text-center py-20 text-xl font-semibold">Đang tải...</div>;

  // Tính tổng tiền dựa trên số lượng và giá đã fetch
  const subtotal = allProducts.reduce(
    (sum, prd) => sum + (productPrices[prd.productId] || 0) * (quantities[prd.productId] ?? prd.quantity ?? 1),
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // Xử lý tăng/giảm số lượng
  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] ?? 1) + delta)
    }));
  };

  const handleRemove = async (productId: string) => {
    try {
      console.log('Xóa sản phẩm:', productId); // Thêm log
      const res = await Http.delete('/carts', { data: { productId } });
      console.log('Kết quả xóa:', res);
      setRefresh(r => !r);
      window.location.reload();
    } catch (err) {
      message.error('Xóa sản phẩm thất bại!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-pink-700 mb-10 text-center drop-shadow">
          Giỏ Sách/Truyện của bạn
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {allProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-10 text-center">
                <p className="text-gray-500 text-lg">Giỏ hàng của bạn đang trống.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {allProducts.map((prd, index) => (
                  <div key={`${prd.productId}-${index}`} className="relative">
                    <CartItem
                      productId={prd.productId}
                      quantity={quantities[prd.productId] ?? prd.quantity ?? 1}
                      price={productPrices[prd.productId] || 0}
                      name={productDetails[prd.productId]?.name || ''}
                      image={productDetails[prd.productId]?.image || ''}
                      onQuantityChange={delta => handleQuantityChange(prd.productId, delta)}
                    />

                    <DeleteButton
                      refetch={() => setRefresh(prev => !prev)}
                      resource="carts"
                      id={prd.productId}
                    />
                  </div>
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