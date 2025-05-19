import { colors } from './commons/colors'
import AppRouter from './routes'
import { ConfigProvider as AntDesignProvider } from 'antd'

function App() {
	return (
		<AntDesignProvider
			theme={{
				token: {},
			}}
			button={{ style: { backgroundColor: colors['button-2-bg'], height: 'auto' } }}>
			<AppRouter />
		</AntDesignProvider>
	)
}

export default App
