import { Input, InputProps } from 'antd'
import clsx from 'clsx'
import React, { useState } from 'react'

interface FloatingLabelInputProps extends InputProps {
	label: string // Nội dung của label
	name: string // Tên của input (dùng để xác định movingPlaceholders)
	className?: string // ClassName tùy chỉnh cho Input
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ label, name, className, ...props }) => {
	const [movingPlaceholders, setMovingPlaceholders] = useState(false)
	const addMovingPlaceholders: InputProps['onFocus'] = e => {
		if (!props.value) setMovingPlaceholders(true)
	}

	const removeMovingPlaceholders: InputProps['onBlur'] = e => {
		if (!props.value) setMovingPlaceholders(false)
	}

	// Add autocomplete attribute for password fields
	const getAutocomplete = () => {
		if (props.type === 'password') {
			return name === 'password' ? 'current-password' : 'new-password'
		}
		return props.autoComplete || 'off'
	}

	return (
		<div className='relative'>
			<label
				htmlFor={name}
				className={clsx(
					'absolute bottom-0 z-10 text-xl select-none bg-white mb-2 px-2 ml-2 text-black dark:bg-input-dark dark:text-white',
					{
						'-translate-y-full': movingPlaceholders,
					},
				)}>
				{label}
			</label>
			<Input
				className={clsx('text-2xl border-0 border-b border-b-gray-500 focus:border', className)}
				onFocus={addMovingPlaceholders}
				onBlur={removeMovingPlaceholders}
				name={name}
				autoComplete={getAutocomplete()}
				{...props}
			/>
		</div>
	)
}

export default FloatingLabelInput
