import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from 'src/components/layout'
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

export default function App({ Component, pageProps }: AppProps) {
	return <MantineProvider withNormalizeCSS withGlobalStyles>
		<NotificationsProvider>
			<Layout> <Component {...pageProps} /></Layout>
		</NotificationsProvider>
	</MantineProvider>
}


// import '../styles/globals.css'
// import type { AppProps } from 'next/app'
// import Layout from 'src/components/layout'

// export default function App({ Component, pageProps }: AppProps) {
// 	return <Layout> <Component {...pageProps} /></Layout>
// }