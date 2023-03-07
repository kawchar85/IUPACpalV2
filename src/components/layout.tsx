import React from 'react'
import HeaderResponsive from './header'

const Layout = ({ children }: React.PropsWithChildren) => {
	return (
		<div>
			<HeaderResponsive />
			{children}
		</div>
	)
}

export default Layout