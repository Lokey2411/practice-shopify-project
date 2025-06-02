import React from 'react'
import { Carousel } from 'antd'

const Slider: React.FC = () => (
	<Carousel autoplay autoplaySpeed={3000}>
		<div>
			<img
				src="https://toplist.vn/images/800px/truyen-tranh-hay-nhat-nhat-ban-59716.jpg"
				alt="Cửa hàng truyện 1"
				className="w-full h-[400px] object-cover rounded-lg shadow-lg"
			/>
		</div>
		<div>
			<img
				src="https://storage-bravo.cuutruyen.net/file/cuutruyen/uploads/manga/484/panorama/processed-967d771a2446c56315546d23bcfb40b3.jpg"
				alt="Cửa hàng truyện 2"
				className="w-full h-[400px] object-cover rounded-lg shadow-lg"
			/>
		</div>
		<div>
			<img
				src="https://th.bing.com/th/id/OIP.Nk0zaPajT_WmZZ_9NJU95gHaEK?rs=1&pid=ImgDetMainhttps://somoskudasai.com/wp-content/uploads/2022/12/kimetsu-no-yaiba-1.jpg"
				alt="Cửa hàng truyện 3"
				className="w-full h-[400px] object-cover rounded-lg shadow-lg"
			/>
		</div>
		<div>
			<img
				src="https://th.bing.com/th/id/OIP.wWA5-4PT8cxG68WfPHmKOQHaFN?rs=1&pid=ImgDetMainhttps://www.animepilipinas.com/wp-content/uploads/2019/03/Doraemon.jpg"
				alt="Cửa hàng truyện 4"
				className="w-full h-[400px] object-cover rounded-lg shadow-lg"
			/>
		</div>
	</Carousel>
)

export default Slider