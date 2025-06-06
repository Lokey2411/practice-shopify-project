import React from 'react'

type Props = {
    productId: string,
    quantity: number,
    price: number,
    name: string,
    image: string,
    handleRemove: (id: string) => void,
    onQuantityChange: (delta: number) => void
}

const CartItem = ({
    productId,
    quantity,
    price,
    name,
    image,
    handleRemove,
    onQuantityChange
}: Props) => {
    return (
        <div className='flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4'>
            <img src={image} alt={name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1 ml-4">
                <div className="font-bold">{name}</div>
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
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleRemove(productId)}>
                        <span className="material-icons">delete</span>
                    </button>
                </div>
            </div>
            <p>
                {(Number(price) * Number(quantity)).toLocaleString()}₫
            </p>
        </div>
    )
}

export default CartItem