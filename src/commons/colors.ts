import { theme } from 'antd'
import { SeedToken } from 'antd/es/theme/internal'

const { defaultAlgorithm } = theme

export const colors = {
	...defaultAlgorithm({} as SeedToken),
}
