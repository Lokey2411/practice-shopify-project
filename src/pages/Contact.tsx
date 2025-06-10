import React from 'react'
import { Input, Button } from 'antd'
import { MailOutlined, PhoneOutlined } from '@ant-design/icons'
import Breadcrumbs from '@/components/Breadcrumbs'

const { TextArea } = Input

const Contact: React.FC = () => {
	return (
		<div>
			<div className='mt-8'>
				<Breadcrumbs />
			</div>
			<section className='py-6 bg-white'>
				<div className='px-app'>
					<div className='flex flex-col md:flex-row gap-6'>
						{/* LEFT COLUMN */}
						<div className='w-full md:w-1/3'>
							<div className='bg-white shadow-md px-6 py-12 rounded-md border h-full flex flex-col justify-between'>
								{/* Call Section */}
								<div className='flex flex-col h-full justify-between'>
									<div className='flex items-center gap-4 mb-4'>
										<div className='text-white bg-button-2-bg p-2 rounded-4xl'>
											<PhoneOutlined style={{ fontSize: 25 }} />
										</div>
										<h3 className='font-semibold text-lg'>Call To Us</h3>
									</div>
									<a href='tel:+8801611112222' className='text-sm text-text-2 mt-1 font-bold hover:underline'>
										Phone: +8801611112222
									</a>
								</div>

								<hr className='mt-6' />

								{/* Write Section */}
								<div>
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
								</div>
							</div>
						</div>

						{/* RIGHT COLUMN */}
						<div className='w-full md:w-2/3'>
							<div className='bg-white shadow-md p-6 rounded-md border h-full min-h-[460px] flex flex-col justify-between'>
								<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
									<Input
										placeholder='Your Name *'
										className='!bg-secondary-bg !border-none !focus:bg-white !focus:shadow-md !text-primary-text'
									/>
									<Input
										placeholder='Your Email *'
										className='!bg-secondary-bg border-none focus:bg-white focus:shadow-md'
									/>
									<Input
										placeholder='Your Phone *'
										className='!bg-secondary-bg border-none focus:bg-white focus:shadow-md'
									/>
								</div>
								<div className='mt-4'>
									<TextArea
										placeholder='Your Message'
										rows={10}
										className='resize-none !bg-secondary-bg !border-none !focus:bg-white !focus:shadow-md'
									/>
								</div>
								<div className='mt-4 text-right'>
									<Button type='primary' danger className='px-8 py-2 !bg-button-2-bg'>
										Send Message
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Contact
