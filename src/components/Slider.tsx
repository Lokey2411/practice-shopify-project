import React from 'react'
import { Carousel } from 'antd'
import Image from 'antd/es/image'

interface SliderProps {
	images: { src: string; alt: string }[]
}

const Slider: React.FC<SliderProps> = ({ images }) => (
	<Carousel autoplay autoplaySpeed={3000}>
		{images.map((img, idx) => (
			<div key={idx} className='w-full'>
				<Image
					src={img.src}
					alt={img.alt}
					rootClassName='w-full'
					style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: '0.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
					preview={false}
				/>
			</div>
		))}
	</Carousel>
)

export default Slider