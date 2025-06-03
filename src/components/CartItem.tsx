import { useFetch } from '@/hooks/useFetch'
import { IOrder } from '@/types/IOrder'
import { IProduct } from '@/types/IProduct'
import { Skeleton } from 'antd'
import React from 'react'

type Props = IOrder & {
    handleRemove: (id: string) => void,
    quantity: number,
    onQuantityChange: (delta: number) => void
}

const ProductItem = ({
    productId,
    quantity,
    cartId,
    cartPrice,
    handleRemove,
    onQuantityChange
}: {
    productId: string,
    quantity: number,
    cartId: string,
    cartPrice: number,
    handleRemove: (id: string) => void,
    onQuantityChange: (delta: number) => void
}) => {
    const { data: product, loading } = useFetch<IProduct>(`/products/${productId}`)
    if (loading ?? !product) return <Skeleton active />
    return (
        <>
            <img
                src={product.images[0] ?? '/no-image.png'}
                alt={product.name ?? 'No name'}
                className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                    {product.name ?? 'No name'}
                </h3>
                <p className="text-gray-600">{product.price}</p>
                <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center border rounded">
                        <button
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            onClick={() => onQuantityChange(-1)}
                        >
                            -
                        </button>
                        <span className="px-4 py-1">{quantity}</span>
                        <button
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            onClick={() => onQuantityChange(1)}
                        >
                            +
                        </button>
                    </div>
                    <button className="text-red-500 hover:text-red-700">
                        <span className="material-icons" onClick={() => handleRemove(productId)}>
                            delete
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

const CartItem = ({ handleRemove, quantity, onQuantityChange, ...cart }: Props) => {
    return (
        <div className='flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4'>
            {cart.products.map((prd, idx) => (
                <React.Fragment key={`${cart._id}-${prd.productId}-${idx}`}>
                    <ProductItem
                        cartId={cart._id}
                        cartPrice={cart.price}
                        quantity={quantity}
                        handleRemove={handleRemove}
                        productId={prd.productId}
                        onQuantityChange={onQuantityChange}
                    />
                    <p className="text-lg font-semibold text-gray-800">
                        ${(cart.price * quantity).toFixed(2)}
                    </p>
                </React.Fragment>
            ))}

        </div>
    )
}

export default CartItem