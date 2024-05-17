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

    return (
        <div className="container">

            <div className='pt-3'>
                <h3 className='mt-3 mb-4 fw-500'>Welcome, {userInfo && userInfo.name.split(" ")[0]}!</h3>


            </div>

            <div className="row pt-5">
                <div className="col-md-6">
                    <div className="bg-white rounded p-3 shadow-sm">
                        <h6 className='bold mb-3'>Project overview</h6>
                        <div className='d-flex'>
                            <img
                                src={projectInfo?.image ?? projectPlaceholderIcon}
                                className="rounded"
                                style={{ height: 55, width: 55, objectFit: "cover" }}
                                alt=""
                            />
                            <div className='ps-3 d-flex flex-column'>
                                <span className='fw-500'>{projectInfo.name}</span>
                                <span className='small text-muted pb-3 pt-1'>{projectInfo.description}</span>
                                <span className='badge badge-primary bg-warning fw-400'>Status: <span className='fw-500'>{projectInfo.status}</span></span>
                            </div>

                        </div>


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