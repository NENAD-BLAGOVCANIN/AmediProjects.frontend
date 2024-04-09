import React from 'react'
import MyCalendar from '../components/MyCalendar'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

function Calendar() {
  return (
    <div className='page-content-wrapper'>

    <Sidebar />

    <div className='main-content-wrapper'>

        <Header pageTitle="Calendar" />

        <div className='main-container'>
            <MyCalendar />
        </div>
    </div>

</div>
  )
}

export default Calendar