import React from 'react'
import Layout from '../Layout/Layout'
import UserInfo from './UserInfo'

const UserLayout = (props) => {

	const { children } = props
	return (
		<Layout>
			<UserInfo />
			{children}
		</Layout>
	)
}

export default UserLayout
