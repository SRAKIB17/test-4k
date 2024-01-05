import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './Componets/Shared/Navbar/Navbar'
import { addToDb } from './Componets/utitilies/databse'
export const DataContext = createContext(null)
function App() {


  const addData = (data) => {
    console.log(data.foodId);
    addToDb(data?.foodId)
  }
  const info = {

    addData
  }
  return (
    <div className=''>
      <DataContext.Provider value={info}>
        <Navbar />
        <div className='w-[90%] mx-auto mt-32'>
          <Outlet></Outlet>
        </div>
      </DataContext.Provider>
    </div>

  )
}

export default App
