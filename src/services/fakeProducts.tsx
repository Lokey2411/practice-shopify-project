export const fakeProducts = Array.from({ length: 20 }, (_, index) => ({
	_id: `product_${index + 1}`,
	name: `Product ${index + 1}`,
	categories: [
		{
			_id: '67f4fb9b167a220f52962b52',
			name: 'test_category edited name',
			image: '',
			isNewArrival: false,
			description: '',
			isDeleted: false,
			createdAt: '2025-04-08T10:34:03.344Z',
			updatedAt: '2025-04-08T10:40:37.390Z',
			__v: 0,
		},
	],
	images: [`https://picsum.photos/seed/product${index + 1}/400/400`],
	price: `${10000 + index * 500}-${20000 + index * 500}`,
	sizes: [],
	colors: [],
	isDeleted: false,
	createdAt: '2025-04-08T10:55:22.612Z',
	updatedAt: '2025-04-08T10:55:22.612Z',
	__v: 0,
}));

