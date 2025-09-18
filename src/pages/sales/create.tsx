import { Create, useForm } from '@refinedev/antd'
import { useSelect } from '@refinedev/core'
import { Checkbox, Flex, Form, Input, InputNumber, Select, Upload } from 'antd'
import FormItemLabel from 'antd/es/form/FormItemLabel'
import { useState } from 'react'

export const SaleCreate = () => {
	const { formProps, saveButtonProps } = useForm({})
	const { options } = useSelect(
		{
			resource: 'products',
			optionLabel: 'name',
			optionValue: '_id',
		},

	)
	return (
		<Create saveButtonProps={saveButtonProps}>
			<Form {...formProps} layout='vertical'>
				<Form.Item
					label={'Product'}
					name={['product']}
					rules={[
						{
							required: true,
						},
					]}>
					<select>
						{options.map(opt => {
							return (
								<option key={opt.value} value={opt.value}>{opt.label}</option>
							)
						})}
					</select>
				</Form.Item>
				<Flex gap={8} align='center'>
					<FormItemLabel prefixCls='' label='Is Flash Sale'></FormItemLabel>
					<Form.Item className='mb-0' label='' name={['isFlashSale']} fieldId='checked'>
						<Checkbox type='checkbox' />
					</Form.Item>
				</Flex>
				<Form.Item label={'Percentage'} name={['percentage']}>
					<InputNumber />
				</Form.Item>
			</Form>
		</Create>
	)
}
