import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	code: {
		borderRadius: theme.radius.sm,
		padding: `${theme.spacing.lg}px ${theme.spacing.lg}px`,
		fontFamily: theme.fontFamilyMonospace,
		fontSize: theme.fontSizes.md,
		overflowX: 'auto',
		whiteSpace: 'pre-wrap',
		wordBreak: 'break-word',
	},

	noResults: {
		backgroundColor: '#f8d7da',
		color: '#721c24',
		padding: '10px',
		borderRadius: '5px',
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: '20px',
	},
	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		paddingTop: theme.spacing.xl * 0.0001,
		paddingBottom: theme.spacing.xl * 4,
	},

	content: {

		marginTop: '80px',
		maxWidth: 700,
		marginRight: theme.spacing.xl * 3,

		[theme.fn.smallerThan('md')]: {
			maxWidth: '100%',
			marginRight: 0,
		},
	},

	title: {
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: 42,
		lineHeight: 1.2,
		fontWeight: 900,

		[theme.fn.smallerThan('xs')]: {
			fontSize: 28,
		},
	},

	control: {
		backgroundColor: '#caad7e',
		[theme.fn.smallerThan('xs')]: {
			flex: 1,
		},
	},

	image: {
		flex: 1,

		[theme.fn.smallerThan('md')]: {
			display: 'none',
		},
	},

	highlight: {
		position: 'relative',
		backgroundColor: '#caad7e',
		borderRadius: theme.radius.sm,
		padding: '4px 12px',
	},

}));

export default useStyles;