import { SelectProps, Select as AntdSelect } from 'antd'

export default function Select({ selectProps, ...props }: SelectProps & { readonly selectProps: SelectProps }) {
	return (
		<AntdSelect
			{...selectProps}
			getPopupContainer={triggerNode => triggerNode.parentElement}
			showSearch
			filterOption={(input, option) => {
				const label = option?.label
				if (typeof label === 'string') {
					return label.toLowerCase().includes(input.toLowerCase())
				}
				return false
			}}
			{...props}
			dropdownStyle={{
				zIndex: 1000,
				top: '100%',
				overflowY: 'auto',
				left: 0,
				position: 'absolute',
				bottom: 'auto',
				...props.dropdownStyle,
			}}
		/>
	)
}
