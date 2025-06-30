import { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { IOrder } from '@/types/IOrder';
import Http from '@/services/Api';
import { message, notification } from 'antd';
import CartItem from '@/components/CartItem';
import { useNavigate } from 'react-router-dom';
import makeRequest from '@/services/makeRequest';
import { useApi } from '@/context/ApiContext';

const Cart = () => {
  const [refresh, setRefresh] = useState(false);
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
  const { cart: data, cartLoading: loading, refetchCart } = useApi();
  const [productPrices, setProductPrices] = useState<{ [id: string]: number }>({});
  const [productDetails, setProductDetails] = useState<{ [id: string]: { name: string, image: string } }>({});
  const navigate = useNavigate();
  const orderId = Array.isArray(data) && data.length > 0 ? data[0]._id : '';
  const [api, contextHolder] = notification.useNotification();

  const allProducts = Array.isArray(data)
    ? data.flatMap(order => order.products)
    : [];

  const subtotal = Array.isArray(allProducts)
    ? allProducts.reduce(
      (sum, prd) => sum + (productPrices[prd.productId] || 0) * (quantities[prd.productId] ?? prd.quantity ?? 1),
      0
    )
    : 0;

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  useEffect(() => {
    console.log("Dữ liệu carts:", data);
    if (Array.isArray(data)) {
      const productQuantities = allProducts.reduce((obj, prd) => {
        obj[prd.productId] = prd.quantity;
        return obj;
      }, {} as { [id: string]: number });
      setQuantities(productQuantities);
    }
  }, [data]);

  useEffect(() => {

    makeRequest.put('/carts', { price: total }).catch((err) => console.log(err));
  }, [total]);

  useEffect(() => {
    const fetchDetails = async () => {
      const prices: { [id: string]: number } = {};
      const details: { [id: string]: { name: string, image: string } } = {};
      await Promise.all(
        allProducts.map(async prd => {
          try {
            const res = await Http.get(`/products/${prd.productId}`);
            const data = res.data?.data ?? {};
            prices[prd.productId] = Number(String(data.price).replace(/[^\d]/g, ''));
            details[prd.productId] = {
              name: data.name ?? '',
              image: data.images?.[0] ?? '',
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

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] ?? 1) + delta)
    }));
  };

  const handleRemove = async (productId: string) => {
    try {
      await Http.delete('/carts', { data: { productId } });
      await refetchCart();
    } catch (err) {
      api.error({
        message: 'Xóa thất bại',
        description: 'Không thể xóa sản phẩm khỏi giỏ hàng!',
      });
    }
  };

  if (loading) return <div className="text-center py-20 text-xl font-semibold">Đang tải...</div>;

  return (
    <>
      {contextHolder}
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
                        handleRemove={handleRemove}
                        productId={prd.productId}
                        quantity={quantities[prd.productId] ?? prd.quantity ?? 1}
                        price={productPrices[prd.productId] || 0}
                        name={productDetails[prd.productId]?.name || ''}
                        image={productDetails[prd.productId]?.image || ''}
                        onQuantityChange={delta => handleQuantityChange(prd.productId, delta)}
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
              <button
                className="w-full mt-8 bg-pink-600 text-white py-3 rounded-xl text-lg font-bold hover:bg-pink-700 transition duration-300 shadow"
                onClick={() => {
                  if (!orderId) {
                    message.error('Đơn hàng chưa được tạo hoặc chưa sẵn sàng!');
                    return;
                  }

                  navigate('/checkout', {
                    state: {
                      orderId,
                      products: allProducts,
                      total: total
                    }
                  });
                }}
              >
                Thanh toán ngay
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
