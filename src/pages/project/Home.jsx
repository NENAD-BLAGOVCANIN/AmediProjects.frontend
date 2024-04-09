import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { getUserInfo } from '../../api/user';

function Home() {

    const [userInfo, setUserInfo] = useState(null);

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

    return (
        <div className='main-content-wrapper'>

            <Sidebar />

            <div className='w-100 overflow-auto'>

                <Header pageTitle="🏡 Project Home" />

                <div className='main-container'>

                    <h3 className='bold text-center py-5'>⛅ Good morning, Nenad</h3>

                    <div className='text-center m-auto' style={{ maxWidth: 950 }}>
                        <h2>{userInfo ? userInfo.project.name : ''}</h2>

                        <p className='text-muted text-justify pt-2'>
                            Give your colleagues a place to learn about your team, and what you’re working on. Use the + buttons in your left-hand sidebar to add more pages, like process docs or a project roadmap.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam deleniti debitis, magnam voluptate unde ad, quos, error maxime suscipit tenetur et. Placeat officiis, quibusdam quo voluptatem unde deleniti accusamus eligendi.
                        </p>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Home