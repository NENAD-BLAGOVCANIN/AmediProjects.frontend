import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { assignTo } from '../../api/tasks';
import profileImagePlaceholder from "../../assets/img/profile.svg";
import { useTranslation } from 'react-i18next';

function UpdateAssigneeDropdown({ projectMembers, selectedTask, setSelectedTask, tasks, setTasks }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleAssignTask = async (user_id) => {
        try {
            const updatedTask = await assignTo(user_id, selectedTask.id);

            const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);

            if (taskIndex !== -1) {
                const updatedTasks = [...tasks];
                updatedTasks[taskIndex] = updatedTask;

                setSelectedTask(updatedTask);
            } else {
                console.error('Updated task not found in tasks array');
            }
        } catch (error) {
            console.error('Error fetching:', error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown d-flex w-100" ref={dropdownRef}>
            <button
                className="btn btn-basic bg-gray-light"
                onClick={toggleDropdown}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
            {isOpen && (
                <div className="dropdown-menu show p-3 border-0 shadow" aria-labelledby="dropdownMenuButton">
                    <div className='pb-3'>
                        <span className='pt-2 fw-500'>Assign to</span>
                    </div>
                    {projectMembers.map(projectMember => (
                        <li className='nav-item assignee-nav-item py-2 pe-4 pointer' key={projectMember.id} onClick={() => { handleAssignTask(projectMember.user.id) }}>
                            <img src={projectMember?.user?.profile_image ?? profileImagePlaceholder} className='img-fluid rounded-circle' style={{ width: 35, height: 35, objectFit: 'cover' }} alt="" />
                            <span className='ps-2'>
                                {projectMember.user.name}
                            </span>
                        </li>
                    ))}

                    <li className='nav-item assignee-nav-item py-2 px-2 pointer' onClick={() => { handleAssignTask(null) }}>
                        <FontAwesomeIcon icon={faUserXmark} />
                        <span className='ps-2'>Unset Assignee</span>
                    </li>

                </div>
            )}
        </div>
    );
}

export default UpdateAssigneeDropdown;
