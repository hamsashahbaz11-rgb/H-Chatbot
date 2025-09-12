"use client"

import { useId, useState } from "react"
import { CircleAlertIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DialogWithInput({ onSave }) {
  const id = useId()
  const [localValue, setLocalValue] = useState("")
  const [error, setError] = useState("")

  // Validation logic
  const isValidChatName = (name) => {
    if (!name.trim()) return false
    if (name.length < 3) return false
    if (/^[a-zA-Z]$/.test(name)) return false
    return true
  }

  const handleChange = (e) => {
    const value = e.target.value
    setLocalValue(value)

    if (!isValidChatName(value)) {
      setError(
        "Please enter a meaningful chat name (e.g. 'AI Study Help', 'Shopping List'). Avoid single letters."
      )
    } else {
      setError("")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Chat</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Name Your Chat</DialogTitle>
            <DialogDescription className="sm:text-center">
              Give your chat a clear and descriptive name about the topic you
              want to discuss.
              <br />
              <span className="text-foreground font-medium">
                Avoid names like "a", "b", "c".
              </span>
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
          <div className="*:not-first:mt-2">
            <Label htmlFor={id}>Chat Name</Label>
            <Input
              id={id}
              type="text"
              placeholder="e.g. React Project Help"
              value={localValue}
              onChange={handleChange}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                className="flex-1"
                disabled={!isValidChatName(localValue)}
                onClick={() => onSave?.(localValue)}
              >
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
