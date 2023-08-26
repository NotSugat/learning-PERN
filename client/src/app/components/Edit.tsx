import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import { AiTwotoneEdit } from "react-icons/ai"
import axios from "axios"
import { toggleEdit } from "@/redux/features/todo-slice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"

export function Edit({ id, prevText }: { id: number, prevText: string }) {
  const [newTask, setNewTask] = useState<string>(prevText)
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdate = async () => {

    try {
      const res = await axios.put(`http://localhost:5000/todos/${id}`, {
        description: newTask,
      })
      console.log(res)
      dispatch(toggleEdit())
    } catch (error) {
      console.log(error)

    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="p-2">
          <AiTwotoneEdit />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Task</SheetTitle>
          <SheetDescription>
            Make changes to your task here. Click save when youre done.
          </SheetDescription>
        </SheetHeader>

        <div className="flex gap-4 items-center mt-4">
          <Label htmlFor="name">
            Task
          </Label>
          <Input id="name" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        </div>

        <SheetFooter className="mt-4 ">
          <SheetClose asChild>
            <Button type="submit" onClick={handleUpdate}>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

