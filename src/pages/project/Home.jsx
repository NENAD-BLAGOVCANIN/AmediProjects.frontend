import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { getUserInfo } from '../../api/user';
import MyCalendar from '../../components/MyCalendar';
import profileImagePlaceholder from '../../assets/img/profile.svg'
import placeholderProfileImage1 from '../../assets/img/placeholder-profile-img-1.jpeg'
import placeholderProfileImage2 from '../../assets/img/placeholder-profile-img-2.jpg'

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
        <div className='page-content-wrapper'>

            <Sidebar />

            <div className='main-content-wrapper'>

                <Header pageTitle="🏡 Project Home" />

                <div className='main-container'>

                    <div className="container">

                        <div className='pt-3'>
                            <h1 style={{ fontSize: '40pt' }}>
                                🏡
                            </h1>
                            <h2 className='bold mt-3 mb-4'>Project Home</h2>

                            <span className='badge badge-primary bg-warning fw-400'>Status: <span className='fw-500'>In Progress</span></span>

                            <div className='d-flex align-items-center pt-3 pb-5'>
                                <span className='fw-500'>Team:</span>
                                <div className='rounded bg-gray px-2 py-1 small mx-2'>
                                    <span className='pe-2 small'>Wanda</span>
                                    <img src={profileImagePlaceholder} className='rounded-circle' alt="" style={{ maxHeight: 25, height: '100%' }} />
                                </div>
                                <div className='rounded bg-gray px-2 py-1 small mx-2'>
                                    <span className='pe-2 small'>Wanda</span>
                                    <img src={placeholderProfileImage1} className='rounded-circle' alt="" style={{ maxHeight: 25, height: '100%' }} />
                                </div>
                                <div className='rounded bg-gray px-2 py-1 small mx-2'>
                                    <span className='pe-2 small'>Wanda</span>
                                    <img src={placeholderProfileImage2} className='rounded-circle' alt="" style={{ maxHeight: 25, height: '100%' }} />
                                </div>
                            </div>

                            <p className='text-muted medium pt-2' style={{ textAlign: 'justify' }}>
                                Give your colleagues a place to learn about your team, and what you’re working on. Use the + buttons in your left-hand sidebar to add more pages, like process docs or a project roadmap.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam deleniti debitis, magnam voluptate unde ad, quos, error maxime suscipit tenetur et. Placeat officiis, quibusdam quo voluptatem unde deleniti accusamus eligendi.
                                Give your colleagues a place to learn about your team, and what you’re working on.
                            </p>
                        </div>

                        <div className="row pt-5">
                            <div className="col-md-6">
                                <h5 className='bold'>About the team</h5>
                                <p className='text-muted medium'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit eligendi dicta sint ipsam architecto veritatis earum placeat reiciendis modi ipsum, possimus sequi perspiciatis id in aperiam! Libero, impedit? Placeat, alias!</p>
                            </div>
                            <div className="col-md-6">
                                <h5 className='bold'>Resources</h5>
                                <p className='text-muted medium'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit eligendi dicta sint ipsam architecto veritatis earum placeat reiciendis modi ipsum, possimus sequi perspiciatis id in aperiam! Libero, impedit? Placeat, alias!</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home