import { useEffect, useState } from 'react';
import { createStyles, Header, Container, Group, Burger, Paper, Transition, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HEADER_HEIGHT, links } from './data';
import useStyles from './styles';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';


// interface HeaderResponsiveProps {
//   links: { link: string; label: string }[];
// }

export default function HeaderResponsive() {
	const router = useRouter();
	const [opened, { toggle, close }] = useDisclosure(false);
	const [active, setActive] = useState(router.asPath);
	const { classes, cx } = useStyles();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Get the current page URL
	const currentUrl = router.asPath;

	console.log("Current URL: " + currentUrl);

	useEffect(() => {
		// console.log('active= ' + active + ", URL = " + router.asPath);
		setActive(router.asPath);
		if (Cookies.get('admin'))
			setIsLoggedIn(true);
		console.log(router.asPath + " , " + Cookies.get('admin') + " --> " + isLoggedIn);
		console.log(process.cwd());


	}, [router.asPath]);

	const itemsAdmin = links.map((link) => (
		<Link
			key={link.label}
			href={link.link}
			className={cx(classes.link, { [classes.linkActive]: active === link.link })}
			onClick={(event) => {
				//event.preventDefault();
				setActive(link.link);
				close();
			}}
		>
			{link.label}
		</Link>
	));
	const items = links
		.filter((link) => link.label !== "Logout") // exclude links with label "Logout"
		.map((link) => (
			<Link
				key={link.label}
				href={link.link}
				className={cx(classes.link, { [classes.linkActive]: active === link.link })}
				onClick={(event) => {
					//event.preventDefault();
					setActive(link.link);
					close();
				}}
			>
				{link.label}
			</Link>
		));


	return (
		<Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
			<Container className={classes.header}>
				<Text color="white" size={28}>IUPACpal.v2</Text>
				<Group spacing={5} className={classes.links}>
					{isLoggedIn == true ? itemsAdmin : items}
				</Group>

				<Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

				<Transition transition="pop-top-right" duration={200} mounted={opened}>
					{(styles) => (
						<Paper className={classes.dropdown} withBorder style={styles}>
							{isLoggedIn == true ? itemsAdmin : items}
						</Paper>
					)}
				</Transition>
			</Container>
		</Header>
	);
}