import { Row, Col, Card, Typography, Space } from 'antd'
import { CarOutlined, CustomerServiceOutlined, SafetyCertificateOutlined } from '@ant-design/icons'


type FeatureCardProps = {
	icon: React.ReactNode
	title: string
	description: string
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
	<Card
		style={{
			textAlign: 'center',
			border: 'none',
			background: 'transparent',
		}}>
		<Space direction='vertical' align='center' size='large'>
			<div className='rounded-full p-4 bg-gray-200 flex items-center justify-center'>
				<div className='rounded-full w-16 h-16 bg-black flex items-center justify-center'>

				{icon}
				</div>
			</div>
			<p className='font-semibold text-xl'>
				{title}
			</p>
			<p className='text-sm'>{description}</p>
		</Space>
	</Card>
)

const FeaturesSectionAntd = () => {
	return (
		<div>
			<Row justify='center' gutter={[24, 24]}>
				<Col xs={24} sm={12} md={8} lg={8}>
					<FeatureCard
						icon={<CarOutlined style={{ fontSize: '24px', color: 'white' }}/>}
						title='FREE AND FAST DELIVERY'
						description='Free delivery for all orders over $140'
					/>
				</Col>
				<Col xs={24} sm={12} md={8} lg={8}>
					<FeatureCard
						icon={<CustomerServiceOutlined style={{ fontSize: '24px', color: 'white' }}/>}
						title='24/7 CUSTOMER SERVICE'
						description='Friendly 24/7 customer support'
					/>
				</Col>
				<Col xs={24} sm={12} md={8} lg={8}>
					<FeatureCard
						icon={<SafetyCertificateOutlined style={{ fontSize: '24px', color: 'white' }}/>}
						title='MONEY BACK GUARANTEE'
						description='We return money within 30 days'
					/>
				</Col>
			</Row>
		</div>
	)
}

export default FeaturesSectionAntd
