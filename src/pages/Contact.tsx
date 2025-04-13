import React from 'react'
import { Input, Button, Col } from 'antd'
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
							<div className='bg-white shadow-md px-6 py-12 rounded-md border h-full min-h-[460px] flex flex-col justify-between'>
								{/* Call Section */}
								<div>
									<div className='flex items-center gap-4 mb-4'>
										<div className='text-white bg-red-500 p-3 rounded-full'>
											<PhoneOutlined className='text-lg' />
										</div>
										<h3 className='font-semibold text-lg'>Call To Us</h3>
									</div>
									<p className='text-sm text-gray-500 font-bold'>We are available 24/7, 7 days a week.</p>
									<p className='text-sm text-gray-500 mt-1 font-bold'>Phone: +8801611112222</p>
								</div>

								<hr className="mt-6" />

								{/* Write Section */}
								<div>
									<div className='flex items-center gap-4 mb-4'>
										<div className='text-white bg-red-500 p-3 rounded-full'>
											<MailOutlined className='text-lg' />
										</div>
										<h3 className='font-semibold text-lg'>Write To Us</h3>
									</div>
									<p className='text-sm text-gray-500 font-bold'>Fill out our form and we will contact you within 24 hours.</p>
									<p className='text-sm text-gray-500 mt-1 font-bold'>Emails: customer@exclusive.com</p>
									<p className='text-sm text-gray-500 font-bold'>support@exclusive.com</p>
								</div>
							</div>
						</div>

						{/* RIGHT COLUMN */}
						<div className='w-full md:w-2/3'>
							<div className='bg-white shadow-md p-6 rounded-md border h-full min-h-[460px] flex flex-col justify-between'>
								<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
									<Input placeholder='Your Name *'  className='bg-gray-100 border-none focus:bg-white focus:shadow-md py-2' />
									<Input placeholder='Your Email *' className='py-2' />
									<Input placeholder='Your Phone *' className='py-2' />
								</div>
								<div className='mt-4'>
									<TextArea placeholder='Your Message' rows={10} className='resize-none' />
								</div>
								<div className='mt-4 text-right'>
									<Button type='primary' danger className='px-8 py-2'>
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
