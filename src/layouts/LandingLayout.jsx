import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import SocialHeader from '../components/SocialHeader';
import { getUserInfo } from '../api/user';

function LandingLayout() {

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const fetchedUserInfo = await getUserInfo();
                setUserInfo(fetchedUserInfo);
                console.log(fetchedUserInfo);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchUserInfo();

    }, []);


    return (
        <div>
            <SocialHeader userInfo={userInfo} setUserInfo={setUserInfo} />
            <div className="">
                <Outlet />
            </div>
        </div>
    )
}

export default LandingLayout