import { Pool } from "pg"

const pool = new Pool({
	user: "postgres",
	password: "sugat123",
	host: "localhost",
	port: 5000,
	database: "perntodo"
})

export default pool;
