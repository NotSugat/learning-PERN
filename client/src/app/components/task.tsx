"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { BsTrash3 } from "react-icons/bs"
import axios from "axios"

export function Task({ id, description, handleDelete }: { id: number, description: string, handleDelete: (id: number) => any }) {

  return (
    <div className="flex items-center space-x-2 justify-between">
      <div className=" flex items-center gap-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {description}
        </label>
      </div>
      <button onClick={handleDelete(id)}>
        <BsTrash3 className="text-red-500 text-2xl hover:bg-secondary p-1 hover:text-2xl rounded-full" />
      </button>
    </div>
  )
}

