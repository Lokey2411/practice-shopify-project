import { useFetch } from '@/hooks/useFetch';
import { IProduct } from '@/types/IProduct';
import IWishList from '@/types/IWishLish';
import React from 'react'

const WishList = () => {
  const { data: products } = useFetch<IWishList[]>('/favorites');
  console.log(products);
  return (
    <div>
      <h2 className='text-3xl text-pink-400 font-bold'>My wish lish</h2>
      <div className='grid grid-cols-3 mt-5 gap-4 font-bold border-2 border-pink-400 p-4 rounded-lg'>
        {products?.map((item) => (
          <div key={item._id} className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
            <img src={item.products.images[0]} alt={item.products.name} className='w-full h-48 object-cover rounded-lg mb-4' />
            <h3 className='text-xl font-semibold text-gray-800'>{item.products.name}</h3>
            <p className='text-gray-600 mt-2'>{item.products.author}</p>
            <p className='text-red-500 mt-2'>{item.products.price.toLocaleString()}₫</p>
          </div>

        ))}
      </div>
    </div>
  )
}

export default WishList
