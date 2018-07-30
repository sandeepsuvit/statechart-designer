const anchor = [
	[0, 0, { type: 'input' }],
	[0, 0, { type: 'output' }],
	[0.5, 0, { type: 'input' }],
	[0.5, 0, { type: 'output' }],
	[1, 0, { type: 'input' }],
	[1, 0, { type: 'output' }],
	[0, 1, { type: 'input' }],
	[0, 1, { type: 'output' }],
	[0.5, 1, { type: 'input' }],
	[0.5, 1, { type: 'output' }],
	[1, 1, { type: 'input' }],
	[1, 1, { type: 'output' }],
]

export default [
	{
		key: 'state',
		size: '170*34',
		label: 'State',
		class: 'pannel-type-icon',
		color: '#1890FF',
		typeIconUrl: '/assets/icons/state.svg',
		stateIconUrl: '/assets/icons/icon1.svg',
		anchor,
	},
	{
		key: 'read-data-base',
		size: '170*34',
		label: 'Parallel State',
		class: 'pannel-type-icon',
		color: '#9254DE',
		typeIconUrl: '/assets/icons/state.svg',
		stateIconUrl: '/assets/icons/icon2.svg',
		anchor,
	},
	{
		key: 'history',
		size: '170*34',
		label: 'History',
		class: 'pannel-type-icon',
		color: '#FAAD14',
		typeIconUrl: '/assets/icons/state.svg',
		stateIconUrl: '/assets/icons/icon1.svg',
		anchor,
	},
]