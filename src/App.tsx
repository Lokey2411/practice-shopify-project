import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
	ErrorComponent,
	ThemedLayoutV2,
	ThemedSiderV2,
	useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
	DocumentTitleHandler,
	NavigateToResource,
	UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { BlogPostCreate, BlogPostEdit, BlogPostList, BlogPostShow } from "./pages/blog-posts";
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from "./pages/categories";
import { resources } from "./commons/resources";
import { dataProvider } from "./services/dataProvider";
import { UserCreate, UserEdit, UserList, UserShow } from "./pages/users";

function App() {
	return (
		<BrowserRouter>
			<GitHubBanner />
			<RefineKbarProvider>
				<ColorModeContextProvider>
					<AntdApp>
						<DevtoolsProvider>
							<Refine
								dataProvider={dataProvider}
								notificationProvider={useNotificationProvider}
								routerProvider={routerBindings}
								resources={resources}
								options={{
									syncWithLocation: true,
									warnWhenUnsavedChanges: true,
									useNewQueryKeys: true,
									projectId: "PL1utc-deWPY1-Ik8vat",
								}}
							>
								<Routes>
									<Route
										element={
											<ThemedLayoutV2
												Header={() => <Header sticky />}
												Sider={(props) => (
													<ThemedSiderV2
														{...props}
														fixed
													/>
												)}
											>
												<Outlet />
											</ThemedLayoutV2>
										}
									>
										<Route
											index
											element={<NavigateToResource resource="blog_posts" />}
										/>
										<Route path="/blog_posts">
											<Route
												index
												element={<BlogPostList />}
											/>
											<Route
												path="create"
												element={<BlogPostCreate />}
											/>
											<Route
												path="edit/:id"
												element={<BlogPostEdit />}
											/>
											<Route
												path="show/:id"
												element={<BlogPostShow />}
											/>
										</Route>
										<Route path="/categories">
											<Route
												index
												element={<CategoryList />}
											/>
											<Route
												path="create"
												element={<CategoryCreate />}
											/>
											<Route
												path="edit/:id"
												element={<CategoryEdit />}
											/>
											<Route
												path="show/:id"
												element={<CategoryShow />}
											/>
										</Route>
										<Route path="/users">
											<Route
												index
												element={<UserList />}
											/>
											<Route
												path="create"
												element={<UserCreate />}
											/>
											<Route
												path="edit/:id"
												element={<UserEdit />}
											/>
											<Route
												path="show/:id"
												element={<UserShow />}
											/>
										</Route>
										<Route
											path="*"
											element={<ErrorComponent />}
										/>
									</Route>
								</Routes>

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
	);
}

export default App;
