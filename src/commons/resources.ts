const reosourcesName = ['categories', 'products', 'users', 'sliders']

export const resources = reosourcesName.map(name => ({
	name,
	list: `/${name}`,
	create: `/${name}/create`,
	edit: `/${name}/edit/:id`,
	show: `/${name}/show/:id`,
	meta: {
		canDelete: true,
	},
}))
