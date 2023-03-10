import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import Cookies from "js-cookie";
import { useEffect } from 'react';

export function AdminLogout() {
	const router = useRouter();

	useEffect(() => {

		const isLoggedIn = Cookies.get('admin');
		router.push('/');
		if (isLoggedIn) {
			Cookies.remove("admin");
			router.reload();

			showNotification({
				title: "Logged Out",
				message: "Log out successful",
				color: "teal",
				autoClose: 5000,
			});
		}

	}, []);

	return (
		<></>
	);
}


