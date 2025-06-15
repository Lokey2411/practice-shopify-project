import React from 'react'
import { Input, Button, notification } from 'antd'
import { MailOutlined, PhoneOutlined } from '@ant-design/icons'
import Breadcrumbs from '@/components/Breadcrumbs'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const { TextArea } = Input

const Contact: React.FC = () => {
	const [leftRef, leftInView] = useInView({ triggerOnce: true, threshold: 0.2 })
	const [rightRef, rightInView] = useInView({ triggerOnce: true, threshold: 0.2 })

	const fadeIn = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	}

	const staggerContainer = {
		hidden: { opacity: 1 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	}

	const handleSendMessage = () => {
		notification.info({
			message: 'Sending Message...',
			description: 'Please wait while we process your request.',
			duration: 2,
		});

		setTimeout(() => {
			notification.success({
				message: 'Success',
				description: 'Your message has been sent successfully! We will get back to you soon.',
				duration: 3,
			});
		}, 2000);
	};

	return (
		<div>
			<div className='mt-8'>
				<Breadcrumbs />
			</div>
			<section className='py-6 bg-white'>
				<div className='px-app'>
					<div className='flex flex-col md:flex-row gap-6'>
						{/* LEFT COLUMN */}
						<motion.div
							ref={leftRef}
							initial='hidden'
							animate={leftInView ? 'visible' : 'hidden'}
							variants={staggerContainer}
							className='w-full md:w-1/3'
						>
							<motion.div variants={fadeIn} className='bg-white shadow-md px-6 py-12 rounded-md border h-full flex flex-col justify-between'>
								{/* Call Section */}
								<div className='flex flex-col h-full justify-between'>
									<motion.div variants={fadeIn} className='flex items-center gap-4 mb-4'>
										<div className='text-white bg-button-2-bg p-2 rounded-4xl'>
											<PhoneOutlined style={{ fontSize: 25 }} />
										</div>
										<h3 className='font-semibold text-lg'>Call To Us</h3>
									</motion.div>
									<motion.a
										href='tel:+8801611112222'
										className='text-sm text-text-2 mt-1 font-bold hover:underline'
										variants={fadeIn}
									>
										Phone: +8801611112222
									</motion.a>
								</div>

								<hr className='mt-6' />

								{/* Write Section */}
								<motion.div variants={fadeIn}>
									<div className='flex items-center gap-4 my-6'>
										<div className='text-white bg-secondary-bg-2 p-2 rounded-4xl'>
											<MailOutlined style={{ fontSize: 25 }} />
										</div>
										<h3 className='font-semibold text-lg'>Write To Us</h3>
									</div>
									<p className='text-sm text-text-2 font-bold'>
										Fill out our form and we will contact you within 24 hours.
									</p>
									<p className='text-sm text-text-2 mt-1 font-bold'>
										Emails:{' '}
										<a href='mailto:customer@exclusive.com' className='hover:underline'>
											customer@exclusive.com
										</a>
									</p>
									<p className='text-sm text-text-2 font-bold'>
										<a href='mailto:support@exclusive.com' className='hover:underline'>
											support@exclusive.com
										</a>
									</p>
								</motion.div>
							</motion.div>
						</motion.div>

						{/* RIGHT COLUMN */}
						<motion.div
							ref={rightRef}
							initial='hidden'
							animate={rightInView ? 'visible' : 'hidden'}
							variants={staggerContainer}
							className='w-full md:w-2/3'
						>
							<motion.div variants={fadeIn} className='bg-white shadow-md p-6 rounded-md border h-full min-h-[460px] flex flex-col justify-between'>
								<motion.div variants={staggerContainer} className='grid grid-cols-1 md:grid-cols-3 gap-4'>
									<motion.div variants={fadeIn}>
										<Input
											placeholder='Your Name *'
											className='!bg-secondary-bg !border-none !focus:bg-white !focus:shadow-md !text-primary-text'
										/>
									</motion.div>
									<motion.div variants={fadeIn}>
										<Input
											placeholder='Your Email *'
											className='!bg-secondary-bg border-none focus:bg-white focus:shadow-md'
										/>
									</motion.div>
									<motion.div variants={fadeIn}>
										<Input
											placeholder='Your Phone *'
											className='!bg-secondary-bg border-none focus:bg-white focus:shadow-md'
										/>
									</motion.div>
								</motion.div>
								<motion.div variants={fadeIn} className='mt-4'>
									<TextArea
										placeholder='Your Message'
										rows={10}
										className='resize-none !bg-secondary-bg !border-none !focus:bg-white !focus:shadow-md'
									/>
								</motion.div>
								<motion.div variants={fadeIn} className='mt-4 text-right'>
									<Button
										type='primary'
										danger
										className='px-8 py-2 !bg-button-2-bg hover:scale-105 transition-transform duration-300'
										onClick={handleSendMessage}
									>
										Send Message
									</Button>
								</motion.div>
							</motion.div>
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Contact