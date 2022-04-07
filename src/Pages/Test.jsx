import React from 'react'

const Test = () => {
  return (
    <div>
        <div className="md:flex hidden">
            <p>Desktop Nav</p>
            <h1 className="text-2xl md:text-5xl">Test</h1>
        </div>
        <div className="md:hidden flex">
            <p>Nav mobile</p>
            <h1 className="text-5xl">Mobile</h1>
        </div>
        <nav className="hidden md:flex">
            <h1 className="text-lg">Mobile</h1>
        </nav>
    </div>
  )
}

export default Test