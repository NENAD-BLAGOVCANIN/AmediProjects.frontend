import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { getUserInfo } from '../../api/user';
import MyCalendar from '../../components/MyCalendar';

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

                <div className='home-hero-section'>
                    <h3 className='bold'>⛅ Good morning, Nenad</h3>
                    <h5>Ready for the meeting at 10am?</h5>
                </div>

                <div className='main-container'>

                    <div className='pt-3'>
                        <h4>About the project</h4>

                        <p className='text-muted medium pt-2' style={{textAlign: 'justify'}}>
                            Give your colleagues a place to learn about your team, and what you’re working on. Use the + buttons in your left-hand sidebar to add more pages, like process docs or a project roadmap.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam deleniti debitis, magnam voluptate unde ad, quos, error maxime suscipit tenetur et. Placeat officiis, quibusdam quo voluptatem unde deleniti accusamus eligendi.
                            Give your colleagues a place to learn about your team, and what you’re working on.
                        </p>
                    </div>

                    <div className="row pt-5">
                        <div className="col-md-6">
                            <h4>About the team</h4>
                            <p className='medium'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit eligendi dicta sint ipsam architecto veritatis earum placeat reiciendis modi ipsum, possimus sequi perspiciatis id in aperiam! Libero, impedit? Placeat, alias!</p>
                        </div>
                        <div className="col-md-6">
                            <h4>Resources</h4>
                            <p className='medium'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit eligendi dicta sint ipsam architecto veritatis earum placeat reiciendis modi ipsum, possimus sequi perspiciatis id in aperiam! Libero, impedit? Placeat, alias!</p>
                        </div>
                    </div>

                    <MyCalendar />


                </div>
            </div>
        </div>
    )
}

export default Home