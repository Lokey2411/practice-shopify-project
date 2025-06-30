import { GlobalApiContextProvider } from './context/ApiContext'
import { NotificationContextProvider } from './context/NotificationContex'
import AppRouter from './routes'
import { ConfigProvider as AntDesignProvider } from 'antd'

function App() {
	return (
		<GlobalApiContextProvider>
			<NotificationContextProvider>
				<AntDesignProvider>
					<AppRouter />
				</AntDesignProvider>
			</NotificationContextProvider>
		</GlobalApiContextProvider>
	)
}

export default App
