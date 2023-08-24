import express from "express"
import cors from "cors"
import pool from "./db";
const app = express();

// middleware
app.use(cors())
app.use(express.json())


//rest api

// get all items
app.post("/todos", (req, res) => {
	try {
		console.log(req.body)
	} catch (error) {
		console.log(err.message);

	}
})

app.listen(5000, () => {
	console.log("server listening in port 5000");
})
