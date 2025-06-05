import React, { useState, useEffect } from 'react'
import { Col, Image } from 'antd'

interface TimeLeft {
	days: number
	hours: number
	minutes: number
	seconds: number
}

const CountdownHero: React.FC = () => {
	const targetDate = new Date().getTime() + 5 * 24 * 60 * 60 * 1000

	const calculateTimeLeft = (): TimeLeft => {
		const now = new Date().getTime()
		const difference = targetDate - now

		let timeLeft: TimeLeft = {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
		}

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			}
		}

		return timeLeft
	}

	const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft())
		}, 1000)
		return () => clearInterval(timer)
	}, [])
	const TimeCircle = (value: number, label: string) => (
		<div className='flex flex-col items-center justify-center w-20 h-20 bg-white text-black rounded-full shadow-md'>
			<span className='font-bold text-lg'>{String(value).padStart(2, '0')}</span>
			<span className='text-xs'>{label}</span>
		</div>
	)

	return (
		<section className='w-full bg-black text-white py-12 px-6'>
			<div className='max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10'>
				{/* Left Content */}
				<div className='flex-1'>
					<span className='text-green-500 font-semibold text-sm'>Categories</span>
					<h1 className='text-4xl md:text-5xl font-bold my-4'>
						Enhance Your
						<br />
						Music Experience
					</h1>

					
					<div className='flex gap-4 my-6'>
						{TimeCircle(timeLeft.hours, 'Hours')}
						{TimeCircle(timeLeft.days, 'Days')}
						{TimeCircle(timeLeft.minutes, 'Minutes')}
						{TimeCircle(timeLeft.seconds, 'Seconds')}
					</div>

					{/* CTA */}
					<button className='bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded text-white font-medium'>
						Buy Now!
					</button>
				</div>

				{/* Image */}
				<div className='flex-1 flex justify-center'>
					<Image
						src='https://th.bing.com/th/id/OIP.sdt5DjmiVwYEJuawToerZgHaHa?rs=1&pid=ImgDetMain'
						alt='JBL Speaker'
						width={500}
						height={500}
						className='w-full max-w-md object-contain'
						preview={false}
					/>
				</div>
			</div>
		</section>
	)
}

export default CountdownHero
