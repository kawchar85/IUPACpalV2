import {
	createStyles,
	Image,
	Container,
	Title,
	Button,
	Group,
	Text,
	List,
	ThemeIcon,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import Link from 'next/link';
import image from '../../assets/dna.png';
import useStyles from './styles';

export function HeroBullets() {
	const { classes } = useStyles();
	return (
		<div className='container' style={{ marginTop: '-5%' }}>
			<Container>
				<div className={classes.inner}>
					<div className={classes.content}>
						<Title className={classes.title} style={{
							textShadow: "#caad7e 0px 3px 0px, #c4dea4 3px 3px 3px",

						}}>
							Welcome to IUPACpal
						</Title>
						<Text mt="md" style={{
							font: "normal 20px/1.2 Segoe Print,Verdana, Helvetica",
						}}>
							Efficiently identifying Inverted Repeats with gaps and mismatches in IUPAC-encoded DNA sequences.
						</Text>

						<List
							color='#caad7e'
							mt={30}
							spacing="sm"
							size="sm"
							icon={
								<ThemeIcon size={20} radius="xl" style={{ backgroundColor: '#caad7e' }}>
									<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.25" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
										<path d="M5 12l5 5l10 -10"></path>
									</svg>

								</ThemeIcon>
							}
						>
							<List.Item>
								<b>User-friendly interface: </b> Our website provides an easy-to-use interface for identifying IRs, making it accessible to biologists who may not be comfortable with command line interfaces.
							</List.Item>
							<List.Item>
								<b>Efficient identification of IRs:</b> Our website utilizes a combination of data structures and algorithms to efficiently identify IRs in the input DNA sequence.
							</List.Item>
							<List.Item>
								<b>IUPAC encoding compatibility:</b> Our website is specifically designed to work with IUPAC-encoded DNA sequences, which are a standardized representation of DNA sequences.
							</List.Item>
							<List.Item>
								<b>Gap and mismatch support:</b> Our website supports the identification of IRs with gaps and mismatches, providing a more comprehensive analysis of the input DNA sequence.
							</List.Item>
							<List.Item>
								<b>Search functionality:</b> Users can search for previously analyzed DNA sequences in a library of old datasets.
							</List.Item>
							<List.Item>
								<b>Data Storage: </b> The results obtained from the IR identification process will be stored in a MySQL database for easy retrieval and further analysis.
							</List.Item>
						</List>

						<Group mt={30}>
							<Link href="/findIR"><button className='btn2'>Get started</button></Link>
						</Group>
					</div>
					<Image src={image.src} className={classes.image} />
				</div>
			</Container>
		</div>
	);
}