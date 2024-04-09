import React from 'react'
import MyCalendar from '../components/MyCalendar'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

function Calendar() {
  return (
    <div className='main-content-wrapper'>

    <Sidebar />

    <div className='w-100 overflow-auto'>

        <Header pageTitle="Calendar" />

        <div className='main-container'>
            <MyCalendar />
        </div>
    </div>

</div>
  )
}

export default Calendar