import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const isAuthenticated = !!localStorage.getItem('user')

	return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
