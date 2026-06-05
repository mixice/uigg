document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.sider-toggle').forEach(el => {
		el.addEventListener('click', () => {
			const sider = document.querySelector('.sider')
			sider.style.display = sider.offsetParent ? 'none' : ''
		})
	})
	const pageName = location.pathname.split('/').pop().split('.')[0]
	document.querySelectorAll(`.sider a[href="${pageName}.php"]`).forEach(el => {
		const group = el.closest('fold-group')
		if (group) group.classList.add('active')
	})
})
