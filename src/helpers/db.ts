import mysql from 'mysql';

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'iupacpal_dna'
});

connection.connect((err) => {
	if (err) {
		console.error('Error connecting to database: ', err);
		return;
	}
	console.log('Connected to database!');
});

export default connection;
