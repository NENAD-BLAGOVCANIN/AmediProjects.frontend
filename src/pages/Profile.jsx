import React, { useState, useEffect } from 'react'
import placeholderProfileImage from '../assets/img/profile.svg'
import { getUserInfo } from '../api/user'
import { getMyProjects } from '../api/project';
import projectPlaceholderIcon from '../assets/img/projectPlaceholderIcon.jpg'
import profileImagePlaceholder from '../assets/img/profile.svg'
import placeholderProfileImage1 from '../assets/img/placeholder-profile-img-1.jpeg'
import placeholderProfileImage2 from '../assets/img/placeholder-profile-img-2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

function Profile() {

    const [userInfo, setUserInfo] = useState([]);
    const [myProjects, setMyProjects] = useState([]);

    useEffect(() => {
        const fetchMyProjects = async () => {

            try {
                const fetchedMyProjects = await getMyProjects();
                setMyProjects(fetchedMyProjects);
                console.log(fetchedMyProjects);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchMyProjects();

    }, []);

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

        <>

            <div className='container'>
                <h5 className='mt-5 pb-5 bold'>Personal Info</h5>

                <div style={{ maxWidth: 85 }} className='pb-3' >
                    <img src={placeholderProfileImage} className='img-fluid rounded hover' alt="" />
                </div>

                <p className='text-muted'>Name: {userInfo.name}</p>
                <p className='text-muted'>Email: {userInfo.email}</p>
                <p className='text-muted'>Profile Created At: {formatDate(userInfo.created_at)}</p>
                <p className='text-muted'>Email Verified: <span className='badge bagde-primary bg-danger'>No</span></p>
                <p className='text-muted m-0'>Role: <span className='badge bagde-primary bg-success'>{userInfo.role ? userInfo.role.name : ''}</span></p>


                <h5 className='mt-5 bold mb-5 pt-3'>My Projects</h5>
                <div className="row">
                    {myProjects.map(myProject => (
                        <div className="col-12 col-md-6 col-lg-3 col-sm-6 col-xs-6 mb-5" key={myProject.id} >
                            <div className="project-card rounded-sm px-4 pt-3 pb-2 card border-0 bg-white pointer w-100 d-flex">

                                <div className="row">
                                    <div className="col-4">
                                        <div className='card w-fit p-0 border rounded-sm mb-3'>
                                            <img src={projectPlaceholderIcon} className='rounded' style={{ height: 55, width: 55, objectFit: 'cover' }} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-8 px-0">
                                        <h5 className='fw-500 medium'>
                                            {myProject.name.length > 19 ? myProject.name.substring(0, 19) + '...' : myProject.name}
                                        </h5>

                                        <div>
                                            <img src={profileImagePlaceholder} className='rounded-circle' alt="" style={{ maxHeight: 28, height: '100%' }} />
                                            <img src={placeholderProfileImage1} className='rounded-circle transform-left-35' alt="" style={{ maxHeight: 28, height: '100%' }} />
                                            <img src={placeholderProfileImage2} className='rounded-circle transform-left-75' alt="" style={{ maxHeight: 28, height: '100%' }} />
                                        </div>
                                    </div>
                                </div>

                                <span className='text-muted small' id='projectDescription'>{myProject.description}</span>

                                <div className='row align-items-center pt-3'>
                                    <div className="col-4">
                                        <span className='bold'>{myProject.users.length}</span>
                                        <p className='small text-muted'>Members</p>
                                    </div>
                                    <div className="col-4">
                                        <span className='bold small'>{new Date(myProject.created_at).toLocaleDateString()}</span>
                                        <p className='small text-muted'>Created</p>
                                    </div>
                                    <div className="col-4">
                                        <span className='badge badge-primary w-fit p-2 mb-3 bg-warning small'>{myProject.status}</span>
                                    </div>
                                </div>


                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </>


    )
}

export default Profile