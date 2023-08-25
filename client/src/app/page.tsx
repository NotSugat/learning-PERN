"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox"
import { BsTrash3 } from "react-icons/bs"

interface task {
  todo_id: number,
  description: string
}
export default function Home() {
  const [description, setDescription] = useState("");
  const [data, setData] = useState<Array<task>>([]);
  const [dataState, setDataState] = useState<boolean>(false);
  const [isloading, setIsloading] = useState<boolean>(true);
  const [warning, setWarning] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!description) {
      setWarning("enter todo before submitting")
      setTimeout(() => {
        setWarning("")
      }, 2000)
    }
    axios.post("http://localhost:5000/todos", {
      description: description,
    }).then((response) => console.log(response.status, response.data.token))

    setDescription("");
    setDataState(!dataState);
  }
  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:5000/todos/${id}`).then(response => console.log(response.status, `Deleted post with ID ${id}`)).catch(error => console.log(error))
    setDataState(!dataState);
  }





  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/todos");
        const items: task[] = await response.data;
        setData(items)
        setIsloading(false);

      } catch (error) {
        console.log(error)
      }

    }
    getData();
  }, [dataState])




  return (
    <div className="dark grid place-items-center ">

      <h2 className="text-primary text-center text-4xl font-bold">TODO DO IT</h2>
      <form action="submit" onSubmit={handleSubmit} >

        <div className="flex items-center mt-24">
          <input type="text" className='p-2 bg-primary text-secondary' value={description} onChange={e => {
            setDescription(e.target.value);
          }} />
          <Button className="rounded-l-none ">Submit</Button>
        </div>
      </form>
      {
        warning && <p className="text-sm text-red-500">enter todo before submititing!</p>
      }

      <div className="mt-8 w-[30%] space-y-4 max-w-[700px]  ">

        {
          data.map((item) =>
            <div key={item.todo_id} className="flex items-center space-x-2 justify-between">
              <div className=" flex items-center gap-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.description}
                </label>
              </div>
              <button onClick={() => handleDelete(item.todo_id)}>
                <BsTrash3 className="text-red-500 text-2xl hover:bg-secondary p-1 hover:text-2xl rounded-full" />
              </button>
            </div>
          )
        }
      </div>
    </div>
  )
}



