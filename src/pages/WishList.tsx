import { useFetch } from '@/hooks/useFetch';
import { IProduct } from '@/types/IProduct';
import IWishList from '@/types/IWishLish';
import React from 'react'

const WishList = () => {
  const { data: products } = useFetch<IWishList[]>('/WishList');
  return (
    <div>
      <h2>My wish lish</h2>
      
    </div>
  )
}

export default WishList
