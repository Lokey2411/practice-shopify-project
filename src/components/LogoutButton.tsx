import { Button, Flex } from 'antd'
import React from 'react'
import { LogoutOutlined } from '@ant-design/icons'
const LogoutButton = () => {
	return (
		<Button
			onClick={() => {
				localStorage.removeItem('token')
				window.location.reload()
			}}>
			<Flex gap={8}>
				<LogoutOutlined />
				<span>Logout</span>
			</Flex>
		</Button>
	)
}

export default LogoutButton
