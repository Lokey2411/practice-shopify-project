import { Flex } from 'antd'
import React, { useState, useRef } from 'react'

export default function FooterItem({ items }: { readonly items: React.ReactNode[] }) {
	const [showCategoryMenu, setShowCategoryMenu] = useState(false);
	const hideTimeout = useRef<NodeJS.Timeout | null>(null);

	const handleMouseEnter = () => {
		if (hideTimeout.current) clearTimeout(hideTimeout.current);
		setShowCategoryMenu(true);
	};
	const handleMouseLeave = () => {
		hideTimeout.current = setTimeout(() => setShowCategoryMenu(false), 200);
	};

	return (
		<Flex gap={16} vertical>
			{items.map((item, index) => (
				<React.Fragment key={index + 0}>{item}</React.Fragment>
			))}
		</Flex>
	)
}
