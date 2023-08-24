import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
	user: "postgres",
	password: "sugat",
	host: "localhost",
	port: 5432,
	database: "perntodo"
})

client.connect((err) => {
	if (err) {
		console.log('connection error', err.stack)
	} else {
		console.log('connected')
	}

})

export default client;
