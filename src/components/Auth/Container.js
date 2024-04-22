import React from "react"

export default function CenteredContainer({ children }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}