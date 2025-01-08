import React from "react"

const Popup = () => {
  return (
    <div className="flex flex-col justify-center items-center p-6 mx-auto max-w-md font-sans text-center bg-gray-50 rounded-lg shadow-md">
      <h1 className="mb-4 text-2xl text-gray-800">
        Welcome to Youtube GPT
      </h1>
      <p className="mb-6 text-gray-600">
        Enter to Youtube to have a try
      </p>
      <footer className="text-sm text-gray-500">
        Crafted with ❤️ by <strong className="text-gray-700">JXZ</strong>
      </footer>
    </div>
  )
}

export default Popup