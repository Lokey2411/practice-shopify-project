import { AuthProvider, AuthActionResponse } from '@refinedev/core'

export const authProvider: AuthProvider = {
	login: async ({ username, password }: any): Promise<AuthActionResponse> => {
		try {
			const response = await fetch('/services/api/users/admin/login', {
				method: 'POST',
				body: JSON.stringify({ username, password }),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const data = await response.json()

			if (response.ok && data.token) {
				localStorage.setItem('token', data.token) // Lưu token
				return {
					success: true,
					redirectTo: '/categories', // Chuyển hướng sau đăng nhập
				}
			} else {
				return {
					success: false,
					error: new Error(data.message ?? 'Invalid credentials'),
				}
			}
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error : new Error('Login failed'),
			}
		}
	},
	logout: async () => {
		localStorage.removeItem('token')
		return { success: true, redirectTo: '/login' }
	},
	check: async () => {
		const token = localStorage.getItem('token')
		if (token) {
			try {
				const response = await fetch('/services/api/users/admin/token', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				if (response.ok) {
					return { authenticated: true }
				}
			} catch (error) {
				console.error(error)
				localStorage.removeItem('token')
			}
		}
		return { authenticated: false, redirectTo: '/login' }
	},
	onError: async error => {
		if (error.status === 401) {
			localStorage.removeItem('token')
			return { logout: true, redirectTo: '/login' }
		}
		return {}
	},
}
