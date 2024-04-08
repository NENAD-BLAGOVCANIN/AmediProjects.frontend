import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'

function Users() {

    return (
        <div className='main-content-wrapper'>

            <Sidebar />

            <div className='w-100 overflow-auto'>

                <Header pageTitle="My Profile" />

                <div className='main-container'>

                    <div className='d-flex flex-column align-items-center pt-5'>

                        <div className='card bg-gray-light rounded-lg shadow-sm border-0 w-100 py-5 px-4'>

                            <p>Name:</p>
                            <p>Email:</p>
                            <p>Profile Created At: </p>
                            <p className='m-0'>Email Verified: <span className='badge bagde-primary bg-danger'>No</span></p>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Users