import express from "express"
import cors from "cors"
import client from "./db.js"
const app = express();


// middleware
app.use(cors())
app.use(express.json())


//rest api

// get all items
app.get("/todos", async (req, res) => {
	try {
		const allTodos = await client.query("SELECT * FROM todo");
		res.json(allTodos.rows)
	} catch (error) {
		console.log(error.message)

	}
})

//get single item
app.get("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params

		const todo = await client.query("SELECT * FROM todo WHERE todo_id = $1", [id])
		res.json(todo.rows)
		console.log(req.params)
	} catch (error) {
		console.log(error.message)

	}
})

// update todo
app.put("/todos/:id", async (req, res) => {
	try {

		const { id } = req.params
		const { description } = req.body
		const updatedTodo = await client.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *", [description, id])
		res.json(updatedTodo.rows)
	} catch (error) {
		console.log(error.message)
	}
})


// delete todo

app.delete("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params
		const deletedTask = await client.query("DELETE FROM todo WHERE todo_id = $1 RETURNING *", [id])
		res.json(deletedTask.rows)

	} catch (error) {
		console.log(error)
	}
})

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
