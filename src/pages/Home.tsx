import { useState } from 'react'
import { ICategory } from './../types/ICategory'
import Slider from '@/components/Slider'
import ProductSection from '@/components/ProductSection'
import { IProduct } from '@/types/IProduct'
import { useNavigate } from 'react-router-dom'
import FeaturesSectionAntd from '@/components/FeaturesSectionAntd'
import CountdownHero from '@/components/CountdownHero'
import { useFetch } from '@/hooks/useFetch'
import { Skeleton, Radio, Space, Tabs, Image } from 'antd'
import type { RadioChangeEvent } from 'antd'

type TabPosition = 'left' | 'right' | 'top' | 'bottom'

const Home = () => {
	const { data: products } = useFetch<IProduct[]>('/products');
	const { data: categories } = useFetch<ICategory[]>('/categories')
	const navigate = useNavigate()

	const [tabPosition, setTabPosition] = useState<TabPosition>('top');

	const changeTabPosition = (e: RadioChangeEvent) => {
		setTabPosition(e.target.value);
	};

	if (!products || !categories) return <Skeleton active />

	const categoryImages: Record<string, string> = {
		'doraemon': 'https://th.bing.com/th/id/R.1d4e362977262a8b43bdf6ff5a036658?rik=iAs41kupO%2btXvA&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f35100000%2f-Doraemon-doraemon-35140693-1920-1200.jpg&ehk=BGq4YZSkiyqrCWDGDfCIW%2bERdjicGzFtRluHUNchU4w%3d&risl=&pid=ImgRaw&r=0',
		'shin cậu bé bút chì': 'https://th.bing.com/th/id/OIP.bglL4N6U-mTBs237A1s8ZQHaEK?rs=1&pid=ImgDetMain',
		'conan': 'https://th.bing.com/th/id/OIP.S1FPwaPz9EA7A0c-3kBR4QHaEK?rs=1&pid=ImgDetMain',
	};

	const tabItems = categories.map(cat => ({
		label: (
			<span className="flex items-center gap-2">
				<span>{cat.name}</span>
			</span>
		),
		key: cat.name,
		children: (
			<>
				<Image
					src={
						cat.image && cat.image.trim() !== ''
							? cat.image
							: categoryImages[cat.name] || 'https://via.placeholder.com/200x120'
					}
					alt={cat.name}
					width="100%"
					height="100%"
					style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }}
				/>
			</>
		)
	}));


	return (
		<div className="!pt-10 !pb-4 !px-app py-6 bg-gray-50 min-h-screen">
			<div className="max-w-7xl mx-auto">
				{/* Tabs category */}
				<div className="bg-white rounded-xl shadow p-4 mb-8">
					<Space style={{ marginBottom: 24 }}>
						Danh mục sách, truyện:
						<Radio.Group value={tabPosition} onChange={changeTabPosition}>
						</Radio.Group>
					</Space>
					<Tabs

						tabPosition={"left"}
						items={tabItems}
						className="category-tabs"
						moreIcon={null}
					/>
				</div>

				{/* Slider */}
				<div className="mb-8">
					<Slider
						images={[
							{ src: 'https://toplist.vn/images/800px/truyen-tranh-hay-nhat-nhat-ban-59716.jpg', alt: 'Cửa hàng truyện 1' },
							{ src: 'https://storage-bravo.cuutruyen.net/file/cuutruyen/uploads/manga/484/panorama/processed-967d771a2446c56315546d23bcfb40b3.jpg', alt: 'Cửa hàng truyện 2' },
							{ src: 'https://th.bing.com/th/id/OIP.Nk0zaPajT_WmZZ_9NJU95gHaEK?rs=1&pid=ImgDetMainhttps://somoskudasai.com/wp-content/uploads/2022/12/kimetsu-no-yaiba-1.jpg', alt: 'Cửa hàng truyện 3' },
							{ src: 'https://th.bing.com/th/id/OIP.wWA5-4PT8cxG68WfPHmKOQHaFN?rs=1&pid=ImgDetMainhttps://www.animepilipinas.com/wp-content/uploads/2019/03/Doraemon.jpg', alt: 'Cửa hàng truyện 4' },
						]}
					/>
				</div>

				{/* Flash Sales */}
				<div className="mb-12">
					<ProductSection
						title="Flash Sales"
						badge="Today’s"
						showViewAll={true}
						onViewAllClick={() => navigate('/products')}
						products={products.slice(0, 8)}
					/>
				</div>

				{/* Countdown & Best Selling */}
				<div className="mb-12">
					<CountdownHero />
					<ProductSection
						title="Best Selling Products"
						badge="This Month"
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