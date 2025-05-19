import { InputNumber } from 'antd'

const Cart = () => {
	// Sample cart items data
	const cartItems = [
		{
			id: 1,
			name: 'Premium Headphones',
			price: 199.99,
			quantity: 1,
			image: 'https://via.placeholder.com/100',
		},
		{
			id: 2,
			name: 'Wireless Mouse',
			price: 49.99,
			quantity: 2,
			image: 'https://via.placeholder.com/100',
		},
	]

	// Calculate total
	const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
	const tax = subtotal * 0.1
	const total = subtotal + tax

	return (
		<div className='min-h-screen bg-gray-100 py-8'>
			<div className='container mx-auto px-4 max-w-5xl'>
				<h1 className='text-3xl font-bold text-gray-800 mb-8'>Shopping Cart</h1>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Cart Items */}
					<div className='lg:col-span-2'>
						{cartItems.length === 0 ? (
							<div className='bg-white rounded-lg shadow-md p-6 text-center'>
								<p className='text-gray-600'>Your cart is empty</p>
							</div>
						) : (
							<div className='space-y-6'>
								{cartItems.map(item => (
									<div key={item.id} className='bg-white rounded-lg shadow-md p-6 flex items-center space-x-4'>
										<img src={item.image} alt={item.name} className='w-24 h-24 object-cover rounded' />
										<div className='flex-1'>
											<h3 className='text-lg font-semibold text-gray-800'>{item.name}</h3>
											<p className='text-gray-600'>${item.price.toFixed(2)}</p>
											<div className='flex items-center mt-2 space-x-4'>
												<InputNumber
													min={item.quantity}
													value={item.quantity}
													addonAfter={<button className='px-3 py-1 text-gray-600 hover:bg-gray-100'>+</button>}
													addonBefore={<button className='px-3 py-1 text-gray-600 hover:bg-gray-100'>-</button>}
												/>
												<button className='text-red-500 hover:text-red-700'>Remove</button>
											</div>
										</div>
										<p className='text-lg font-semibold text-gray-800'>${(item.price * item.quantity).toFixed(2)}</p>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Order Summary */}
					<div className='bg-white rounded-lg shadow-md p-6 h-fit'>
						<h2 className='text-xl font-semibold text-gray-800 mb-4'>Order Summary</h2>
						<div className='space-y-4'>
							<div className='flex justify-between'>
								<span className='text-gray-600'>Subtotal</span>
								<span className='text-gray-800'>${subtotal.toFixed(2)}</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-gray-600'>Tax (10%)</span>
								<span className='text-gray-800'>${tax.toFixed(2)}</span>
							</div>
							<div className='border-t pt-4'>
								<div className='flex justify-between'>
									<span className='text-lg font-semibold text-gray-800'>Total</span>
									<span className='text-lg font-semibold text-gray-800'>${total.toFixed(2)}</span>
								</div>
							</div>
							<button className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300'>
								Proceed to Checkout
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart
