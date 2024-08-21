import React, { useState, useEffect } from 'react'
import { getUserInfo } from '../../api/user';
import { getProjectInfo } from '../../api/project';
import { getMyProjects } from '../../api/project';

import AddNewProject from '../../components/Home/addNewProject';
import { useTranslation } from 'react-i18next';
function Home() {

    const { t } = useTranslation();
    const [projectInfo, setProjectInfo] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [value, onChange] = useState(new Date());
    const [myProjects, setMyProjects] = useState([]);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const fetchedUserInfo = await getUserInfo();
                setUserInfo(fetchedUserInfo);
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
        const fetchMyProjects = async () => {

            try {
                const fetchedMyProjects = await getMyProjects();
                setMyProjects(fetchedMyProjects);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchMyProjects();
        fetchUserInfo();
        fetchProjectInfo();

    }, []);


    return (
        <div dir="rtl" className="container">
                <div className="col-md-12">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <AddNewProject />
                    </div>
                </div>
            </div>

     
    )
}

export default Home