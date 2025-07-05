import { GitHubBanner, Refine } from '@refinedev/core'
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'

import { RefineThemes, useNotificationProvider } from '@refinedev/antd'
import '@refinedev/antd/dist/reset.css'

import routerBindings, { DocumentTitleHandler, UnsavedChangesNotifier } from '@refinedev/react-router'
import { App as AntdApp, ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router'
import { ColorModeContextProvider } from './contexts/color-mode'
import { resources } from './commons/resources'
import { dataProvider } from './services/dataProvider'
import AppRoute from './routes'
import { authProvider } from './services/authProvider'
import ChatAdmin from '@/pages/chat/ChatAdmin'

function App() {
	return (
		<ConfigProvider theme={RefineThemes.Red}>
			<BrowserRouter>

				<RefineKbarProvider>
					<ColorModeContextProvider>
						<AntdApp>
							<DevtoolsProvider>
								<Refine
									dataProvider={dataProvider}
									authProvider={authProvider}
									notificationProvider={useNotificationProvider}
									routerProvider={routerBindings}
									resources={[
										...resources,
										{ name: "chat", list: ChatAdmin, options: { label: "Chat" } },
									]}
									options={{
										syncWithLocation: true,
										warnWhenUnsavedChanges: true,
										useNewQueryKeys: true,
										projectId: 'PL1utc-deWPY1-Ik8vat',
									}}>
									<AppRoute />

									<RefineKbar />
									<UnsavedChangesNotifier />
									<DocumentTitleHandler />
								</Refine>
								<DevtoolsPanel />
							</DevtoolsProvider>
						</AntdApp>
					</ColorModeContextProvider>
				</RefineKbarProvider>
			</BrowserRouter>
		</ConfigProvider>
	)
}

export default App
