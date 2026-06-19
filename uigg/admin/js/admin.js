ready(() => {
	const { $, $$ } = Uigg
	$$('.sider-toggle').forEach(el => {
		el.addEventListener('click', () => {
			const sider = $('.sider')
			sider.style.display = sider.offsetParent ? 'none' : ''
		})
	})
	const pageName = location.pathname.split('/').pop().split('.')[0]
	$$(`.sider a[href="${pageName}.php"]`).forEach(el => {
		const group = el.closest('fold-group')
		if (group) group.classList.add('active')
	})
})
