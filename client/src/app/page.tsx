"use client"
import { Button } from "@/components/ui/button"
import { Fragment, useEffect, useState } from 'react'
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox"
import { BsTrash3 } from "react-icons/bs"
import { Edit } from "./components/Edit";
import { useAppSelector } from "@/redux/store";

interface task {
  todo_id: number,
  description: string
}
export default function Home() {
  const [description, setDescription] = useState("");
  const [data, setData] = useState<Array<task>>([]);
  const [dataState, setDataState] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("")
  const isEdited = useAppSelector(
    (state) => state.editReducer.isEdited
  )

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
      } catch (error) {
        console.log(error)
      }

    }
    getData();
  }, [dataState, isEdited])


  return (
    <div className="dark grid justify-center mt-24  h-[100vh]">


      <section className="w-[clamp(400px_,_30vw_,_700px)] space-y-12 ">
        <h2 className="text-primary text-center text-4xl font-bold">TODO DO IT</h2>

        <form action="submit" onSubmit={handleSubmit} className="flex items-center" >
          <input type="text" className='p-2 bg-primary text-secondary flex-grow rounded-l-sm' value={description} onChange={e => {
            setDescription(e.target.value);
          }} />
          <Button className="rounded-l-none ">Submit</Button>
        </form>
        {
          warning && <p className="text-sm text-red-500">enter todo before submititing!</p>
        }

        <div className="mt-8 space-y-4">

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

                <div className="flex items-center gap-2">
                  <button onClick={() => handleDelete(item.todo_id)}>
                    <BsTrash3 className="text-red-500 text-2xl hover:bg-secondary p-1 hover:text-2xl rounded-full" />
                  </button>

                  <Edit id={item.todo_id} prevText={item.description} />
                </div>
              </div>
            )
          }
        </div>


      </section>
    </div>
  )
}



