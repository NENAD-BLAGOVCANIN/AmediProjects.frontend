import React, { useState, useEffect } from 'react'
import placeholderProfileImage from '../assets/img/profile.svg'
import { getUserInfo } from '../api/user'

function Profile() {

    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const fetchedUserInfo = await getUserInfo();
                setUserInfo(fetchedUserInfo);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchUserInfo();
    }, []);

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        };
        return date.toLocaleDateString(undefined, options);
    }


    return (

        <div className='d-flex flex-column align-items-center m-auto pt-5' style={{ maxWidth: 800 }}>

            <img src={placeholderProfileImage} className='img-fluid rounded-circle' style={{ maxWidth: 105 }} alt="" />

            <span className='mt-3 mb-5 bold'>{userInfo.name}</span>


            <div className='card bg-gray-light rounded-lg shadow-sm border-0 w-100 py-5 px-4'>

                <p>Name: {userInfo.name}</p>
                <p>Email: {userInfo.email}</p>
                <p>Profile Created At: {formatDate(userInfo.created_at)}</p>
                <p className='m-0'>Email Verified: <span className='badge bagde-primary bg-danger'>No</span></p>

            </div>

        </div>
    )
}

export default Profile