import * as React from "react"
import { Toast } from "./use-toast"

export function ToastComponent({ title, description, variant = 'default' }: Toast) {
  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-md ${
      variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-white text-gray-900'
    }`}>
      <h3 className="font-semibold">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

