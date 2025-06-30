import { SendOutlined } from '@ant-design/icons'
import { Button, Flex, Image, Input } from 'antd'
import IconFacebook from '@/assets/svg/IconFacebook'
import IconTwitter from '@/assets/svg/IconTwitter'
import IconInstagram from '@/assets/svg/IconInstagram'
import IconLinkedIn from '@/assets/svg/IconLinkedIn'

const footerLinks = [
	{
		title: 'Về BookShop',
		links: [
			{ label: 'Giới thiệu', href: '#' },
			{ label: 'Tuyển dụng', href: '#' },
			{ label: 'Tin tức', href: '#' },
			{ label: 'Liên hệ', href: '#' },
		],
	},
	{
		title: 'Hỗ trợ khách hàng',
		links: [
			{ label: 'Chính sách đổi trả', href: '#' },
			{ label: 'Chính sách bảo mật', href: '#' },
			{ label: 'Điều khoản sử dụng', href: '#' },
			{ label: 'Câu hỏi thường gặp', href: '#' },
		],
	},
	{
		title: 'Tài khoản',
		links: [
			{ label: 'Đăng nhập', href: '/login' },
			{ label: 'Đăng ký', href: '/signup' },
			{ label: 'Giỏ hàng', href: '/cart' },
			{ label: 'Yêu thích', href: '/wishlist' },
		],
	},
]

export default function Footer() {
	return (
		<footer className="bg-gradient-to-tr from-blue-900 to-blue-600 text-white pt-12 pb-6 px-4 md:px-0 mt-16 animate-fade-in">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
				{/* Logo & Social */}
				<div className="col-span-1 flex flex-col gap-4">
					<div className="flex items-center gap-3 mb-2">
						<img src="/static/images/footer/app-store.png" alt="BookShop" className="w-12 h-12 rounded-xl shadow border-2 border-blue-200 bg-white" />
						<span className="text-2xl font-extrabold tracking-wide text-white">BookShop</span>
					</div>
					<p className="text-sm opacity-80 mb-2">Nền tảng mua sách, truyện tranh, tiểu thuyết, tài liệu học tập hàng đầu Việt Nam.</p>
					<div className="flex gap-3 mt-2">
						<a href="#" className="hover:text-blue-300 transition"><IconFacebook className="text-2xl" /></a>
						<a href="#" className="hover:text-blue-300 transition"><IconTwitter className="text-2xl" /></a>
						<a href="#" className="hover:text-blue-300 transition"><IconInstagram className="text-2xl" /></a>
						<a href="#" className="hover:text-blue-300 transition"><IconLinkedIn className="text-2xl" /></a>
					</div>
				</div>
				{/* Links */}
				{footerLinks.map((col, idx) => (
					<div key={col.title} className="col-span-1">
						<h3 className="font-bold text-lg mb-3 text-white/90">{col.title}</h3>
						<ul className="space-y-2">
							{col.links.map(link => (
								<li key={link.label}>
									<a href={link.href} className="text-white/80 hover:text-blue-200 transition text-base">{link.label}</a>
								</li>
							))}
						</ul>
					</div>
				))}
				{/* Đăng ký nhận tin */}
				<div className="col-span-1 flex flex-col gap-3">
					<h3 className="font-bold text-lg mb-3 text-white/90">Đăng ký nhận tin</h3>
					<p className="text-white/80 text-sm">Nhận thông tin khuyến mãi, sách mới, sự kiện hấp dẫn từ BookShop.</p>
					<div className="flex gap-2 mt-2">
						<Input
							placeholder="Nhập email của bạn"
							className="rounded-l-lg px-4 py-2 text-base text-black bg-white focus:outline-none"
						/>
						<Button type="primary" className="rounded-r-lg bg-pink-500 hover:bg-pink-600 border-0 flex items-center px-4">
							<SendOutlined />
						</Button>
					</div>
					<div className="flex gap-2 mt-4">
						<img src="/static/images/footer/google-play.png" alt="Google Play" className="h-10 w-auto rounded shadow" />
						<img src="/static/images/footer/app-store.png" alt="App Store" className="h-10 w-auto rounded shadow" />
					</div>
				</div>
			</div>
			<div className="mt-10 border-t border-white/20 pt-4 text-center text-white/70 text-sm">
				© {new Date().getFullYear()} BookShop. All rights reserved.
			</div>
		</footer>
	)
}
