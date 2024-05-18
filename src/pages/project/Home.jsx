import React, { useState, useEffect } from 'react'
import { getUserInfo } from '../../api/user';
import projectPlaceholderIcon from '../../assets/img/projectPlaceholderIcon.jpg'
import { getProjectInfo } from '../../api/project';
import NewNotifications from '../../components/Home/NewNotifications';
import Calendar from 'react-calendar';

function Home() {

    const [projectInfo, setProjectInfo] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const fetchedUserInfo = await getUserInfo();
                setUserInfo(fetchedUserInfo);
                console.log(fetchedUserInfo);
            } catch (error) {
                console.error("Error fetching :", error);
            }
        }
        const fetchProjectInfo = async () => {
            try {
                const fetchedProjectInfo = await getProjectInfo();
                setProjectInfo(fetchedProjectInfo);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchUserInfo();
        fetchProjectInfo();

    }, []);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };

    return (
        <div className="container">

            <div className='pt-3'>
                <h3 className='mt-3 fw-500'>Welcome, {userInfo && userInfo.name.split(" ")[0]}!</h3>
            </div>

            <div className="row pt-3">
                <div className="col-md-6">
                    <div className="bg-white rounded p-3 shadow-sm">
                        <h6 className='bold mb-3'>Project status</h6>

                        <p className='badge badge-primary bg-warning py-2'>Status: {projectInfo.status}</p>
                        <p>Due date: {projectInfo.created_at && formatDate(projectInfo.created_at)}</p>

                    </div>
                </div>
                <div className="col-md-6">
                    <NewNotifications userInfo={userInfo} />
                </div>
            </div>

            <div className="row pt-5">
                <div className="col-md-6">
                </div>
                <div className="col-md-6">
                    <div className="bg-white rounded p-3 shadow-sm">
                        <h6 className='bold mb-3'>My calendar</h6>
                        <Calendar onChange={onChange} value={value} className="w-100 border-0 px-4 my-4" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home