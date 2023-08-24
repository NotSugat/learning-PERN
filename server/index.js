import express from "express"
import cors from "cors"
import client from "./db.js"
const app = express();


// middleware
app.use(cors())
app.use(express.json())


//rest api

// get all items
app.post("/todos", async (req, res) => {
	try {
		const { description } = req.body
		const newTodo = await client.query("INSERT INTO todo(description) VALUES($1) RETURNING *", [description])
		res.json(newTodo.rows[0])
		console.log(req.body)
	} catch (error) {
		console.log(error.message)

	}
})

app.listen(5000, () => {
	console.log("server listening in port 5000");
}) 
