import { useState } from 'react'
import { ICategory } from './../types/ICategory'
import Slider from '@/components/Slider'
import ProductSection from '@/components/ProductSection'
import { IProduct } from '@/types/IProduct'
import { useNavigate } from 'react-router-dom'
import FeaturesSectionAntd from '@/components/FeaturesSectionAntd'
import CountdownHero from '@/components/CountdownHero'
import { useFetch } from '@/hooks/useFetch'
import { Skeleton, Radio, Space, Tabs, Image, Button } from 'antd'
import type { RadioChangeEvent } from 'antd'

const Home = () => {
	const { data: products } = useFetch<IProduct[]>('/products');
	const { data: categories } = useFetch<ICategory[]>('/categories')
	const navigate = useNavigate()

	const [tabPosition, setTabPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('top');

	const changeTabPosition = (e: RadioChangeEvent) => {
		setTabPosition(e.target.value);
	};

	if (!products || !categories) return <Skeleton active />

	// Banner section
	const bannerImg = 'https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/TrangtruyenT6_Banner_840x320.jpg';

	// Category section
	const categoryImages: Record<string, string> = {
		'doraemon': 'https://th.bing.com/th/id/R.1d4e362977262a8b43bdf6ff5a036658?rik=iAs41kupO%2btXvA&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f35100000%2f-Doraemon-doraemon-35140693-1920-1200.jpg&ehk=BGq4YZSkiyqrCWDGDfCIW%2bERdjicGzFtRluHUNchU4w%3d&risl=&pid=ImgRaw&r=0',
		'shin cậu bé bút chì': 'https://th.bing.com/th/id/OIP.bglL4N6U-mTBs237A1s8ZQHaEK?rs=1&pid=ImgDetMain',
		'conan': 'https://th.bing.com/th/id/OIP.S1FPwaPz9EA7A0c-3kBR4QHaEK?rs=1&pid=ImgDetMain',
	};

	const tabItems = categories.map(cat => ({
		label: (
			<span className="flex items-center gap-2 text-base font-semibold text-blue-700">
				<span>{cat.name}</span>
			</span>
		),
		key: cat.name,
		children: (
			<div className="flex flex-col items-center gap-4 py-4">
				<Image
					src={cat.image && cat.image.trim() !== '' ? cat.image : categoryImages[cat.name] || 'https://via.placeholder.com/200x120'}
					alt={cat.name}
					width={240}
					height={160}
					style={{ borderRadius: '16px', objectFit: 'cover', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)' }}
				/>
				<Button type="primary" className="bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-2 text-lg font-bold" onClick={() => navigate('/products?category=' + cat.name)}>
					Xem tất cả {cat.name}
				</Button>
			</div>
		),
	}));

	return (
		<div className="pt-6 pb-4 px-app bg-gradient-to-br from-blue-50 to-pink-50 min-h-screen animate-fade-in">
			<div className="max-w-7xl mx-auto">
				{/* Banner lớn */}
				<div className="mb-10 rounded-2xl overflow-hidden shadow-xl relative flex items-center justify-center h-[320px] bg-gradient-to-r from-blue-400 to-pink-300">
					<img src={bannerImg} alt="Banner" className="w-full h-full object-cover opacity-90" />
					<div className="absolute left-8 top-1/2 -translate-y-1/2 z-10">
						<h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow mb-4 animate-fade-in">Chào mừng đến với BookShop</h1>
						<p className="text-lg md:text-2xl text-white/90 mb-6 animate-fade-in">Khám phá kho sách, truyện tranh, tiểu thuyết, tài liệu học tập phong phú nhất!</p>
						<Button type="primary" size="large" className="bg-pink-500 hover:bg-pink-600 rounded-xl px-8 py-3 text-lg font-bold shadow-lg animate-bounce" onClick={() => navigate('/products')}>
							Khám phá ngay
						</Button>
					</div>
				</div>

				{/* Danh mục nổi bật */}
				<div className="bg-white rounded-xl shadow p-6 mb-10 animate-fade-in">
					<h2 className="text-2xl font-bold text-blue-700 mb-4">Danh mục nổi bật</h2>
					<Tabs
						tabPosition={"left"}
						items={tabItems}
						className="category-tabs"
						moreIcon={null}
					/>
				</div>

				{/* Slider sách hot */}
				<div className="mb-10 animate-fade-in">
					<Slider
						images={[
							{ src: 'https://toplist.vn/images/800px/truyen-tranh-hay-nhat-nhat-ban-59716.jpg', alt: 'Sách hot 1' },
							{ src: 'https://storage-bravo.cuutruyen.net/file/cuutruyen/uploads/manga/484/panorama/processed-967d771a2446c56315546d23bcfb40b3.jpg', alt: 'Sách hot 2' },
							{ src: 'https://th.bing.com/th/id/OIP.Nk0zaPajT_WmZZ_9NJU95gHaEK?rs=1&pid=ImgDetMain', alt: 'Sách hot 3' },
							{ src: 'https://th.bing.com/th/id/OIP.wWA5-4PT8cxG68WfPHmKOQHaFN?rs=1&pid=ImgDetMain', alt: 'Sách hot 4' },
						]}
					/>
				</div>

				{/* Flash Sales */}
				<div className="mb-12 animate-fade-in">
					<ProductSection
						title="Flash Sales"
						badge="Hôm nay"
						showViewAll={true}
						onViewAllClick={() => navigate('/products')}
						products={products.slice(0, 8)}
					/>
				</div>

				{/* Countdown & Best Selling */}
				<div className="mb-12 animate-fade-in">
					<CountdownHero />
					<ProductSection
						title="Best Seller"
						badge="Tháng này"
						showViewAll={true}
						onViewAllClick={() => navigate('/products')}
						products={products.slice(0, 8)}
					/>
				</div>

				{/* Features */}
				<FeaturesSectionAntd />
			</div>
		</div>
	)
}

export default Home