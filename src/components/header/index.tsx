import type { RefineThemedLayoutV2HeaderProps } from '@refinedev/antd'
import { useGetIdentity } from '@refinedev/core'
import { Layout as AntdLayout, Avatar, Flex, Space, Switch, theme, Typography, Button } from 'antd'
import React, { useContext } from 'react'
import { ColorModeContext } from '../../contexts/color-mode'
import LogoutButton from '../LogoutButton'

const { Text } = Typography
const { useToken } = theme

type IUser = {
	id: number
	name: string
	avatar: string
}

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky = true }) => {
	const { token } = useToken()
	const { data: user } = useGetIdentity<IUser>()
	const { mode, setMode } = useContext(ColorModeContext)

	const headerStyles: React.CSSProperties = {
		background: 'linear-gradient(90deg, #38bdf8 0%, #6366f1 100%)',
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		padding: '0px 40px',
		height: '72px',
		borderRadius: '0 0 24px 24px',
		boxShadow: '0 4px 24px #6366f122',
	}

	if (sticky) {
		headerStyles.position = 'sticky'
		headerStyles.top = 0
		headerStyles.zIndex = 1
	}

	return (
		<AntdLayout.Header style={headerStyles}>
			<Space size={24}>
				<Switch
					checkedChildren='🌛'
					unCheckedChildren='🔆'
					onChange={() => setMode(mode === 'light' ? 'dark' : 'light')}
					defaultChecked={mode === 'dark'}
					style={{ background: '#fff', border: '1px solid #6366f1', boxShadow: '0 2px 8px #6366f122' }}
				/>
				<Flex style={{ marginLeft: '8px' }} align='center' gap={16}>
					{user?.avatar && <Avatar src={user?.avatar} alt={user?.name} size={48} style={{ border: '2px solid #fff', boxShadow: '0 2px 8px #6366f122' }} />}
					{user?.name && <Text strong style={{ color: '#fff', fontSize: 20, textShadow: '0 2px 8px #6366f199' }}>{user.name}</Text>}
					<LogoutButton />
				</Flex>
			</Space>
		</AntdLayout.Header>
	)
}
