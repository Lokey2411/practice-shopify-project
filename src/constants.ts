export const PREFIX_PATH = '/services/api'
export const PORT = 8000
type Status = {
	[key: string]: number
}

export const CART_STATUS = 'Pending'

export const STATUS: Status = {
	OK: 200,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
	SERVICE_UNAVAILABLE: 503,
}
