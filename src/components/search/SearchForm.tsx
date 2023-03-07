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
	Input,
	TextInput,
} from '@mantine/core';
import { read } from 'fs';
import { useState } from 'react';
import image from '../../assets/search.jpg';
import Result from './result';
import useStyles from './styles';

type SearchFormProps = {
	onSearch: (searchKeyword: string) => void;
};

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
	const [ready, setReady] = useState(false);

	const { classes } = useStyles();
	const [text, setText] = useState("");

	const closeSearch = () => {
		let x = document.getElementById("myOverlay");
		if (x) {
			x.style.display = "none";
		}
	}
	const openSearch = () => {
		let x = document.getElementById("myOverlay");
		if (x) {
			x.style.display = "block";
		}
	}

	const handleText = (event: { target: { value: any; }; }) => {
		setText(event.target.value);
		if (event.target.value.length > 0) {
			const clear = document.getElementById('input_reset');
			if (clear) {
				clear.style.display = 'block';
			}
		}
	};

	const handleClear = () => {
		const clear = document.getElementById('input_reset');
		const inputBox = document.querySelector('.overlay input[type="text"]') as HTMLInputElement;
		if (clear) {
			clear.style.display = 'none';
			if (inputBox)
				inputBox.value = '';
		}
	}

	const showResult = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(text);
		onSearch(text);
		// setReady(true);
	}

	return (
		<>
			<div className='container' style={{ marginTop: '-75px' }}>
				<Container>
					<div className={classes.inner}>
						<div className={classes.content}>
							<Title className={classes.title} style={{
								textShadow: "#caad7e 0px 3px 0px, #c4dea4 3px 3px 3px",

							}}>
								Inverted Repeat Lookup
							</Title>
							<Text mt="md" style={{
								font: "normal 20px/1.2 Segoe Print,Verdana, Helvetica",
							}}>
								Here you can search for previously obtained Inverted Repeat results by providing
								the name of the DNA sequence. Simply enter the name of the DNA sequence in the
								search box and hit enter to see the list of Inverted Repeats with gaps and mismatches.
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
									<b>Need this?: </b> some dummy text, random text, random random.
								</List.Item>
							</List>

							<Group mt={30}>
								<button className='btn2' onClick={openSearch}>Get started</button>
							</Group>
						</div>
						{/* <Image src={image.src} className={classes.image} /> */}
						<img src='/search.png' height={400} width={350} />
					</div>
				</Container>

				<div id="myOverlay" className="overlay">
					<span className="closebtn" onClick={closeSearch} title="Close Searching">X</span>
					<div className="overlay-content">
						<form onSubmit={showResult}>
							<TextInput placeholder="Search.." onChange={handleText} required />
							<div id='input_reset' onClick={handleClear}>
								<img src='/reset.svg' />
							</div>
							<button type="submit">
								<img src='/search.svg' />
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default SearchForm;