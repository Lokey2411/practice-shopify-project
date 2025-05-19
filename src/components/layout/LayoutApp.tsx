import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { FloatButton } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
export default function LayoutApp() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
			<FloatButton
				icon={<ArrowUpOutlined />}
				onClick={() => window.scroll({ top: 0, behavior: 'smooth' })}
				className='!bg-secondary-bg'
			/>

			<FloatButton.BackTop />
		</>
	)
}
