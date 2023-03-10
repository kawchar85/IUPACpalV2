import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import useStyles from './styles';

import {
	Table,
	TextInput,
	Paper,
	Title,
	Text,
	Container,
	NumberInput,
	Code,
	Modal,
	useMantineTheme,
	Tabs,
	Loader,
} from "@mantine/core";
import Cookies from 'js-cookie';
import router from 'next/router';
import { showNotification } from '@mantine/notifications';
import DisplayResult from '../displayResult';

interface Data {
	id: number;
	input_file_link: string;
	output_file_link: string;
	seq_name: string;
	max_gap: number;
	max_mis: number;
	min_len: number;
	max_len: number;
	status: number;
}

async function getFileContent(url: string) {

	const response = await axios.get(`/api/getFirebaseFileContent?url=${encodeURIComponent(url)}`);
	//console.log(response.data);
	return response.data;
}

export function AdminHome() {
	const { classes } = useStyles();
	const [data, setData] = useState<Data[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [selectedRow, setSelectedRow] = useState<Data | null>(null);
	const [inputContent, setInputContent] = useState("");
	const [outputContent, setOutputContent] = useState("");

	const tableRef = useRef<HTMLTableElement>(null);

	//modal handle
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		const isLoggedIn = Cookies.get('admin');
		if (!isLoggedIn) {
			router.push('./login');
		}

	}, []);

	useEffect(() => {
		axios.get<{ data: Data[]; totalPages: number }>(`/api/get-data-admin?page=${currentPage}`)
			.then(response => {
				setData(response.data.data);
				setTotalPages(response.data.totalPages);
			}
			).catch(error => console.error(error));
	}, [currentPage]);

	const handlePageClick = (page: number) => {
		setCurrentPage(page);
		setSelectedRow(null);
	};
	const handleRowClick = async (row: Data) => {
		console.log(row)
		setInputContent("");
		setOutputContent("");
		setSelectedRow(row);
		setOpen(true);
		try {
			const content = await getFileContent(row.input_file_link);
			setInputContent(content);
		}
		catch (e) {
			console.log(e);
			setInputContent('Opps! Invalid Input File Link!!');
		}
		try {
			const content = await getFileContent(row.output_file_link);
			setOutputContent(content);
		}
		catch (e) {
			console.log(e);
			setOutputContent('Opps! Invalid Output File Link!!');
		}
	};

	const handleClickOutsideTable = (event: MouseEvent) => {
		if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
			setSelectedRow(null);
			// setOpen(true);
		}
	};
	useEffect(() => {
		document.addEventListener('click', handleClickOutsideTable);
		return () => {
			document.removeEventListener('click', handleClickOutsideTable);
		};
	}, []);

	const paginationItems = [];
	for (let i = 1; i <= totalPages; i++) {
		paginationItems.push(
			<li key={i}>
				<button className='myButton' disabled={i === currentPage} onClick={() => handlePageClick(i)}>
					{i}
				</button>
			</li>
		);
	}
	// console.log(data)


	const handleAC = async () => {
		console.log("clicked.....yeeesss");
		//make ac to selected row's id

		axios.put('../api/update-data', {
			id: selectedRow?.id,
			status: 0,
		})
			.then((response) => {
				// console.log(response);
				router.reload();
				showNotification({
					title: "Update Status",
					message: "The analysis is accepted successfully.",
					color: "teal",
					autoClose: 5000,
				});

				setOpen(false);
				setSelectedRow(null);
				if (selectedRow)
					setCurrentPage(currentPage + 0);

			}, (error) => {
				// console.log(error);
				showNotification({
					title: "Update Status",
					message: "Something error in accepting...",
					color: "red",
					autoClose: 5000,
				});

			});
	}

	const handleWA = () => {
		console.log("clicked.....yeeesss");
		//make wa to selected row's id

		axios.put('../api/update-data', {
			id: selectedRow?.id,
			status: 2,
		})
			.then((response) => {
				// console.log(response);
				router.reload();

				showNotification({
					title: "Update Status",
					message: "The analysis is rejected successfully.",
					color: "teal",
					autoClose: 5000,
				});
				setOpen(false);
				setSelectedRow(null);

			}, (error) => {
				// console.log(error);
				showNotification({
					title: "Update Status",
					message: "Something error in rejecting...",
					color: "red",
					autoClose: 5000,
				});
			});
	}

	return (<>
		<div className='container' style={{ marginTop: '-5%' }}>

			<Container>
				<Title className={classes.title} style={{
					textShadow: "#caad7e 0px 3px 0px, #c4dea4 3px 3px 3px",

				}}>
					Pending requests
				</Title>
				<Text mt="md" style={{
					font: "normal 20px/1.2 Segoe Print,Verdana, Helvetica",
				}}>
					You can view pending requests of previously analyzed DNA sequences, as well as the input parameters and
					identified IRs for each analysis. Click on any row to see the input and output and decide whether to reject or accept.

				</Text>

				{data.length ? (
					<Paper withBorder shadow="md" p={30} mt={30} radius="md">


						<table ref={tableRef} className="myTable">
							<thead>
								<tr>
									<th>Sequence name</th>
									<th>Max Gap</th>
									<th>Max mismatch</th>
									<th>Min length</th>
									<th>Max length</th>

								</tr>
							</thead>
							<tbody>
								{data.map((item) => (
									<tr key={item.id} onClick={() => handleRowClick(item)}>
										<td>{item.seq_name}</td>
										<td>{item.max_gap}</td>
										<td>{item.max_mis}</td>
										<td>{item.min_len}</td>
										<td>{item.max_len}</td>
									</tr>
								))}
							</tbody>

							{totalPages >= 2 && (
								<tfoot>
									<tr>
										<td colSpan={5}>
											<div className="links">
												<ul style={{ listStyleType: 'none', display: 'flex', flex: 'horizontal' }}>{paginationItems}</ul>
											</div></td>

									</tr>
								</tfoot>
							)}

						</table>

					</Paper>
				) : (
					<div className={classes.noResults} >No pending requests...</div>
				)}

			</Container>

		</div>

		<Modal opened={open} onClose={handleClose} size="80%" padding="md" title="IR analysis" closeButtonLabel="Close" centered >

			<Tabs color="lime" variant="pills" radius="md" defaultValue="input">
				<Tabs.List>
					<Tabs.Tab value="input">Input</Tabs.Tab>
					<Tabs.Tab value="output">Output</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="input" pt="xs">
					{/* (<Code className={classes.code} block>{inputContent}</Code>) */}
					{inputContent.length ? (<DisplayResult code={inputContent} cnt={20} />) :
						(<div dangerouslySetInnerHTML={{ __html: '<img src="/loading-circle.gif" alt="loading..." />' }}></div>)}



				</Tabs.Panel>

				<Tabs.Panel value="output" pt="xs">

					{outputContent.length ?
						(<DisplayResult code={outputContent} cnt={20} />) :
						(<div dangerouslySetInnerHTML={{ __html: '<img src="/loading-circle.gif" alt="loading..." />' }}></div>)}

				</Tabs.Panel>


			</Tabs>

			<hr style={{ borderTop: "3px solid #caad7e" }} />
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div style={{ overflow: 'auto', width: '50%' }}>
					<div className='my-div' onClick={handleAC} style={{ float: 'left', width: '50%', display: 'flex', justifyContent: 'center' }}> Accept: <img src='/ac.png' /> </div>
					<div className='my-div' onClick={handleWA} style={{ float: 'right', width: '50%', display: 'flex', justifyContent: 'center' }}> Reject: <img src='/wa.png' /> </div>
				</div>
			</div>


		</Modal>
	</>
	)
}