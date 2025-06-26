import {
	BaseKey,
	BaseRecord,
	CreateParams,
	DataProvider,
	GetListParams,
	GetListResponse,
	GetOneParams,
} from '@refinedev/core'
import { UpdateParams } from '@refinedev/core/dist/hooks/data/useUpdate'
import refineDataProvider from '@refinedev/simple-rest'
import { getToken } from '../commons/getToken'

const defaultProvider = refineDataProvider('/services/api')

const createHeader = (token: string) => {
	return {
		Authorization: `Bearer ${token}`,
	}
}

export const dataProvider: DataProvider = {
	...defaultProvider,
	getList: async <TData extends BaseRecord = BaseRecord>({
		resource,
	}: GetListParams): Promise<GetListResponse<TData>> => {
		const response = await defaultProvider.getList<TData>({
			resource,
			meta: {
				headers: {
					...createHeader(`${getToken()}`),
				},
			},
		})
		console.log('categories response:', response)

		const res: any = response;
		const dataArr = Array.isArray(res.data?.data) ? res.data.data : [];
		const total = res.total ?? res.data?.total ?? res.data?.data?.total ?? 0;

		return {
			data: dataArr.map((item: any) => ({ ...item, id: item._id })),
			total,
		}
	},

	getOne: async <TData extends BaseRecord = BaseRecord>({ resource, id }: GetOneParams) => {
		const response = await defaultProvider.getOne<TData>({
			resource,
			id,
			meta: {
				headers: {
					...createHeader(`${getToken()}`),
				},
			},
		})
		return { data: { ...response.data.data, id: response.data.data._id } }
	},

	create: async <TData extends BaseRecord, TVariables = {}>({ resource, variables }: CreateParams<TVariables>) => {
		const response = await defaultProvider.create<TData, TVariables>({
			resource,
			variables,
			meta: {
				headers: {
					...createHeader(`${getToken()}`),
				},
			},
		})
		return { data: response.data }
	},

	update: async <TData extends BaseRecord, TVariables = {}, TError = any>({
		resource,
		id,
		...rest
	}: UpdateParams<TData, TError, TVariables>) => {
		const stringResource = `${resource}`
		const baseKeyId = id as BaseKey
		const response = await defaultProvider.update<TData, TVariables>({
			variables: rest as TVariables,
			resource: stringResource,
			id: baseKeyId,
			...rest,
			meta: {
				method: 'put',
				headers: {
					...createHeader(`${getToken()}`),
				},
			},
		})

		return { data: response.data }
	},
	deleteOne: async ({ resource, id }) => {
		console.log(id)
		return await defaultProvider.deleteOne({
			resource,
			id,
			meta: {
				headers: {
					...createHeader(`${getToken()}`),
				},
			},
		})
	},
	getMany: async ({ resource, ids }) => {
		return await defaultProvider.getMany({
			resource,
			ids,
			meta: {
				headers: {
					...createHeader(`${getToken()}`),
				},
			},
		})
	},
	getApiUrl: () => defaultProvider.getApiUrl(),
}
console.log('defaultProvider.update', defaultProvider.update)
