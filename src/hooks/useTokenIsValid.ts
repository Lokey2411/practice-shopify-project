import { useEffect, useState } from 'react'
import { getToken } from '../commons/getToken'

export const useTokenIsValid = () => {
	const token = getToken()
	const [tokenIsValid, setTokenIsValid] = useState(!!token)

	useEffect(() => {
		if (token) {
			console.log('Checking token validity...')
			// check if token is valid, then refresh
			fetch('/services/api/users/admin/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			})
				.then(response => {
					console.log('Token validation response:', response.status, response.statusText)
					if (!response.ok) {
						console.log('Token is invalid, removing from localStorage')
						localStorage.removeItem('token')
					}
					setTokenIsValid(response.ok)
				})
				.catch(error => {
					console.error('Token validation error:', error)
					setTokenIsValid(false)
					localStorage.removeItem('token')
				})
		} else {
			setTokenIsValid(false)
		}
	}, [token])

	return { token, tokenIsValid }
}
