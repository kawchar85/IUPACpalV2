import { basePath } from './../../src/helpers/projectDirectory';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { exec } from 'child_process';
import { performance } from 'perf_hooks';

export type Data = {
	dnaSequence: string;
	name: string;
	maxMismatch: number;
	maxGap: number;
	minLen: number;
	maxLen: number;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req

	switch (method) {
		case "GET": {
			res.status(200).json({ message: 'Hello from the GET method!' });
			break;
		}
		case "POST": {
			try {
				const { dnaSequence, name, maxMismatch, maxGap, minLen, maxLen } = req.body as Data;

				// Call the C++ program with the input arguments

				// Set the maxBuffer option to 1GB (1000 * 1000 * 1000 bytes)
				const options = { maxBuffer: 1000 * 1000 * 1000 };
				const in_path = basePath + "\\src\\helpers\\input.txt";
				const out_path = basePath + "\\src\\helpers\\IUPACpal.txt";
				const command = basePath + `\\src\\helpers\\IR.exe -s ${name} -g ${maxGap} -x ${maxMismatch} -m ${minLen} -M ${maxLen} -f ${in_path} -o ${out_path}`;
				exec(command, options, (error, stdout, stderr) => {

					if (error) {
						console.error(`exec error: ${error}`);
						///console.log(`stdout: ${stdout}`);
						//console.error(`stderr: ${stderr}`);

						return res.status(500).json({
							// error: `stdout: ${stdout}` + "\n" + `exec error: ${error}`
							error: `stdout: ${stdout}`
						});
					}
					//console.log(`stdout: ${stdout}`);
					//console.error(`stderr: ${stderr}`);

					// Send the output as a response
					const response = {
						answer: "will find ans..., you give: " + dnaSequence + "," + name + "," + maxMismatch + "," + maxGap,
						output: stdout
					};
					res.setHeader("Content-Type", "application/json");
					res.status(200).json(response);
				});

			} catch (err) {
				return res.status(500).json({
					error: 'Something went wrong!'
				});
			}
			break;
		}
		default:
			res.status(400).json({})
	}
}










//version 0

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'
// import { newFunc } from 'src/helpers/someName';

// import { exec } from 'child_process';

// export type Data = {
// 	dnaSequence: string;
// 	name: string;
// 	maxMismatch: number;
// 	maxGap: number
// }

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	const { method } = req

// 	switch (method) {
// 		case "GET": {

// 		}
// 		case "POST": {
// 			try {

// 				const { dnaSequence, name, maxMismatch, maxGap } = req.body as Data


// 				// Accept input data from the front-end
// 				let num1 = 5;
// 				let num2 = 10;

// 				// set headers before calling exec()
// 				res.setHeader("Content-Type", "application/json");

// 				// Call the C++ program with the input arguments
// 				exec(`F:\\350\\IR\\pages\\api\\my_cpp_program.exe ${num1} ${num2}`, (error, stdout, stderr) => {
// 					if (error) {
// 						console.error(`exec error: ${error}`);
// 						return;
// 					}
// 					console.log(`stdout: ${stdout}`);
// 					console.error(`stderr: ${stderr}`);

// 					// Send the output as a response
// 					// return res.status(200).json({
// 					// 	answer: "will find ans..., you give: " + dnaSequence + "," + name + "," + maxMismatch + "," + maxGap,
// 					// 	output: stdout
// 					// });

// 				});


// 				return res.status(201).json({
// 					answer: "will find ans..., you give: " + dnaSequence + "," + name + "," + maxMismatch + "," + maxGap
// 				})
// 			} catch (err) {
// 				return res.status(500).json({
// 					err
// 				})
// 			}


// 		}
// 		default:
// 			res.status(400).json({})
// 	}
// }


//version 3 , not tested
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { newFunc } from 'src/helpers/someName';
// import { exec } from 'child_process';

// export type Data = {
// 	dnaSequence: string;
// 	name: string;
// 	maxMismatch: number;
// 	maxGap: number;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// 	const { method } = req;

// 	switch (method) {
// 		case 'GET': {
// 			// handle GET request
// 			break;
// 		}
// 		case 'POST': {
// 			try {
// 				const { dnaSequence, name, maxMismatch, maxGap } = req.body as Data;

// 				// define an array to store the responses
// 				const responseArr = [];

// 				// call the C++ program with input arguments
// 				exec(`F:\\350\\IR\\pages\\api\\my_cpp_program.exe ${num1} ${num2}`, (error, stdout, stderr) => {
// 					if (error) {
// 						console.error(`exec error: ${error}`);
// 						responseArr.push({ error: 'Something went wrong!' });
// 					} else {
// 						console.log(`stdout: ${stdout}`);
// 						console.error(`stderr: ${stderr}`);
// 						const response = {
// 							answer: `will find ans..., you give: ${dnaSequence},${name},${maxMismatch},${maxGap}`,
// 							output: stdout,
// 						};
// 						responseArr.push(response);
// 					}

// 					// send the response once after all the computations are complete
// 					if (responseArr.length === 1) {
// 						// if there is only one response, send it as is
// 						res.setHeader('Content-Type', 'application/json');
// 						return res.status(200).json(responseArr[0]);
// 					} else if (responseArr.length > 1) {
// 						// if there are multiple responses, send them as an array of responses
// 						res.setHeader('Content-Type', 'application/json');
// 						return res.status(200).json(responseArr);
// 					}
// 				});
// 			} catch (err) {
// 				return res.status(500).json({ error: 'Something went wrong!' });
// 			}
// 			break;
// 		}
// 		default:
// 			res.status(400).json({});
// 			break;
// 	}
// }
