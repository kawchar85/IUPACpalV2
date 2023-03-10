import {
	Image,
	TextInput,
	Paper,
	Title,
	Text,
	Container,
	NumberInput,
	Code,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect, useState } from 'react';
import { FileInput, useMantineTheme } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import useStyles from './styles';
import { Data } from "pages/api/find-ir";
import { axios } from "src/lib/axios";
import styles from "../../../styles/toggle.module.css";
import { uploadFileCallBack } from "src/helpers/uploadHelper";
import { basePath } from "src/helpers/projectDirectory";
import { Card } from '@mantine/core';
import DisplayResult from "../displayResult";


const getData = async () => {
	try {
		const response = await axios.get('/get-data');
		const data = response.data;
		// console.log(data); // logs the data retrieved from the database
	} catch (error) {
		console.error(error);
	}
};


async function getFileContent(url: string) {

	const response = await axios.get(`/getFirebaseFileContent?url=${encodeURIComponent(url)}`);
	//console.log(response.data);
	return response.data;
}

interface FinalValues {
	name: string;
	dnaSequence: string;
	maxMismatch: number;
	maxGap: number;
	minLen: number;
	maxLen: number;
}

function generateName(seq_name: string, max_mis: number, max_gap: number, min_len: number, max_len: number): string {
	let result = '';
	result += seq_name;
	result += "_";
	result += max_mis.toString();
	result += "_";
	result += max_gap.toString();
	result += "_";
	result += min_len.toString();
	result += "_";
	result += max_len.toString();
	result += ".txt";

	return result;
}

export function IRForm() {
	const { classes } = useStyles();
	const [isUsingFileInput, setIsUsingFileInput] = useState(false);
	const [ir, setIr] = useState("");
	const theme = useMantineTheme();
	const [dnaFile, setDnaFile] = useState();
	const [newContent, setNewContent] = useState("");
	const [needClear, setNeedClear] = useState(false);
	const [inputLink, setInputLink] = useState("");
	const [outputLink, setOutputLink] = useState("");
	const [readyDB, setReadyDB] = useState(false);
	const [finalValues, setFinalValues] = useState<FinalValues>({
		dnaSequence: '',
		name: '',
		maxMismatch: 0,
		maxGap: 0,
		minLen: 2,
		maxLen: 10,
	});


	const handleToggle = () => {
		setIsUsingFileInput(!isUsingFileInput);
	};

	const handleFileChange = async (file: any) => {
		setDnaFile(file);
	};


	const handleSubmit = async (values: Data) => {
		setNeedClear(!needClear);
		setReadyDB(false);

		showNotification({
			id: 'load-data',
			loading: true,
			title: "Form submitted successfully",
			message: "The form was submitted successfully. Results will be available soon.",
			color: "teal",
			autoClose: false,
			disallowClose: false,
		});

		setFinalValues(values);
		if (isUsingFileInput) {
			try {
				let fileName = "in_" + generateName(values.name, values.maxMismatch, values.maxGap, values.minLen, values.maxLen);
				const data = await uploadFileCallBack(dnaFile, fileName) as any;
				const firebaseFileUrl = data.data.link;
				setInputLink(firebaseFileUrl);
				const content = await getFileContent(firebaseFileUrl);
				setNewContent(content);
			} catch (error: any) {
				let msg = "There is an error in ";
				if (isUsingFileInput) {
					msg += "your input file";
				} else {
					msg += "your input DNA";
				}

				if (error.response) {
					msg += error.response.data.error;
				} else {
					msg += error.message;
				}

				updateNotification({
					id: "load-data",
					title: "Form submission failed",
					message: msg,
					color: "red",
					autoClose: 15000,
				});

				return;
			}
		} else {
			const content = ">" + form.values.name + "\n" + form.values.dnaSequence;
			setNewContent(content);
		}
	};

	//insert data in database
	useEffect(() => {

		const postData = async () => {
			try {
				const data = {
					input_file_link: inputLink,
					output_file_link: outputLink,
					seq_name: finalValues.name,
					max_gap: finalValues.maxGap,
					max_mis: finalValues.maxMismatch,
					min_len: finalValues.minLen,
					max_len: finalValues.maxLen
				};

				axios.post('/insert-data', data)
					.then(response => {
						console.log('Data inserted successfully');
					})
					.catch(error => {
						console.error('Error inserting data:', error);
					});
			} catch (e) {
				console.log(e);
			}
		}

		if (readyDB && inputLink.length > 0 && outputLink.length > 0) {
			postData();
			setReadyDB(false);
			setInputLink("");
			setOutputLink("");
		}


	}, [readyDB, inputLink, outputLink]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.post("/update-file", { newContent });
				const response2 = await axios.post("/find-ir", finalValues);
				const { answer, output } = response2.data;

				setIr(output);
				setNeedClear(!needClear);
				setReadyDB(true);

				updateNotification({
					id: 'load-data',
					color: 'teal',
					title: 'Result Obtained',
					message: 'Check the Inverted Repeat we found',
					autoClose: 2000,
				});

				let fileName = generateName(finalValues.name, finalValues.maxMismatch, finalValues.maxGap, finalValues.minLen, finalValues.maxLen);

				var filePath = basePath + "\\src\\helpers";
				var file = new File([output], 'IUPACpal.txt');

				try {
					const data = await uploadFileCallBack(file, "out_" + fileName) as any;
					setOutputLink(data.data.link);
					console.log(data.data.link);
					console.log("output lekha sesh");
				} catch (e: any) {
					console.log('in error output');

					showNotification({
						id: 'error',
						title: "Error in writing output file to firebase",
						message: e,
						color: "red",
						autoClose: 1500,
					});
				}

				if (!isUsingFileInput) {
					try {

						// file = new File([filePath], 'input.txt');
						var file = new File([newContent], 'input.txt');
						const data2 = await uploadFileCallBack(file, "in_" + fileName) as any;
						setInputLink(data2.data.link);
						console.log(data2.data.link);
						console.log('input link found...');
					} catch (e: any) {
						console.log('in error input');

						showNotification({
							id: 'error',
							title: "Error in writing input file to firebase",
							message: e,
							color: "red",
							autoClose: 1500,
						});
					}

				}


				// if (!isUsingFileInput) {
				// 	file = new File([filePath], 'input.txt');
				// 	const data2 = await uploadFileCallBack(dnaFile, "in_" + fileName) as any;
				// 	console.log(data2.data.link);
				// }

				// console.log("got\n" + output);

			} catch (error: any) {
				let msg = "There is an error in ";
				if (isUsingFileInput) {
					msg += "your input file";
				} else {
					msg += "your input DNA";
				}

				if (error.response) {
					msg += error.response.data.error;
				} else {
					msg += error.message;
				}

				updateNotification({
					id: "load-data",
					title: "Form submission failed",
					message: msg,
					color: "red",
					autoClose: 15000,
				});
				setNeedClear(!needClear);
			}
		};
		if (newContent.length > 0)
			fetchData();
	}, [newContent]);

	useEffect(() => {
		const clean = async () => {
			setNewContent("");
		};
		if (newContent.length > 0)
			clean();
	}, [needClear]);


	const form = useForm({
		validateInputOnChange: true,

		initialValues: {
			dnaSequence: '',
			name: '',
			maxMismatch: 0,
			maxGap: 0,
			minLen: 2,
			maxLen: 10,

		},

		validate: (values) => ({
			dnaSequence: isUsingFileInput ? null
				: values.dnaSequence === undefined ? 'dna sequence is required'
					: null,
			name: values.name.length < 3 ? 'Too short name' : null,
			maxMismatch:
				values.maxMismatch === undefined
					? 'maximum mismatch is required'
					: values.maxMismatch < 0
						? 'mismatch cannot be less than 0'
						: null,
			maxGap:
				values.maxGap === undefined
					? 'maxGap is required'
					: values.maxGap < 0
						? 'gap cannot be less than 0'
						: null,
			minLen:
				values.minLen === undefined
					? 'minimum length is required'
					: values.minLen < 1
						? 'minimum length cannot be less than 1'
						: values.minLen > values.maxLen
							? 'minimum length cannot be greatert than minimum length'
							: null,
			maxLen:
				values.maxLen === undefined
					? 'maximum length is required'
					: values.maxLen < values.minLen
						? 'maximum length cannot be less than minimum length'
						: null,
		}),

	});

	useEffect(() => {
		const clean = async () => {
			setIr("");
		};
		if (ir.length > 0)
			clean();
	}, [form.values]);

	return (
		<div className='container' style={{ marginTop: '-75px' }}>

			<Container>
				<div className={classes.inner}>
					<div className={classes.content}>
						<Title className={classes.title} style={{
							textShadow: "#caad7e 0px 3px 0px, #c4dea4 3px 3px 3px",

						}}>
							Find IR in IUPAC DNA!
						</Title>
						<Text mt="md" style={{
							font: "normal 20px/1.2 Segoe Print,Verdana, Helvetica",
						}}>
							You can either upload a file containing an IUPAC-encoded DNA sequence or manually enter the sequence
						</Text>

						<Paper withBorder shadow="md" p={30} mt={30} radius="md">

							<form onSubmit={form.onSubmit(handleSubmit)}>

								<div >
									<div className={styles.switchButton}>
										<input
											className={styles.switchButtonCheckbox}
											type="checkbox"
											onChange={handleToggle}
										/>
										<label className={styles.switchButtonLabel}>
											<span className={styles.switchButtonLabelSpan}>
												String
											</span>
										</label>
									</div>
								</div>


								{isUsingFileInput ? (
									<FileInput
										required
										label="DNA file"
										placeholder="Drag and drop or click to select"
										onChange={handleFileChange}
										style={{ marginTop: theme.spacing.md }}
									/>
								) : (
									<TextInput
										required
										label="DNA sequence"
										placeholder="Enter IUPAC-encoded DNA sequence"
										style={{ marginTop: theme.spacing.md }}
										{...form.getInputProps('dnaSequence')}
									/>

								)}

								<TextInput
									required
									label="Sequence Name"
									placeholder="Enter the name of sequence"
									style={{ marginTop: theme.spacing.md }}
									{...form.getInputProps('name')}
								/>
								<NumberInput
									required
									min={0}
									label="Maximum Mismatch"
									placeholder="Maximum Mismatch allowed"
									style={{ marginTop: theme.spacing.md }}
									{...form.getInputProps('maxMismatch')}
								/>

								<NumberInput
									required
									min={0}
									label="Maximum Gap"
									placeholder="Maximum gap allowed"
									style={{ marginTop: theme.spacing.md }}
									{...form.getInputProps('maxGap')}
								/>

								<NumberInput
									required
									min={1}
									label="Minimum Length"
									placeholder="Minimum length of IR"
									style={{ marginTop: theme.spacing.md }}
									{...form.getInputProps('minLen')}
								/>

								<NumberInput
									required
									min={1}
									label="Maximum Length"
									placeholder="Maximum length of IR"
									style={{ marginTop: theme.spacing.md }}
									{...form.getInputProps('maxLen')}
								/>

								<button className="btn1"

								> Submit</button>
							</form>

						</Paper>

					</div>
					<img src='/findIR.png' style={{ height: '45%', width: '40%', marginTop: '15%' }} />
				</div>
				{ir.length > 0 && (
					<DisplayResult code={ir} cnt={20} />
				)}

			</Container>
		</div>
	);
}
