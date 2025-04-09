import React from 'react'
import { Carousel } from 'antd'

const contentStyle: React.CSSProperties = {
	height: '100%',
	width: '100%',
	color: '#fff',
	lineHeight: '300px',
	textAlign: 'center',
	background: '#364d79',
	borderRadius: 8,
}

const Slider: React.FC = () => (
	<Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
		<div>
			<h3 style={contentStyle}>1</h3>
		</div>
		<div>
			<h3 style={contentStyle}>2</h3>
		</div>
		<div>
			<h3 style={contentStyle}>3</h3>
		</div>
		<div>
			<h3 style={contentStyle}>4</h3>
		</div>
	</Carousel>
)

export default Slider
