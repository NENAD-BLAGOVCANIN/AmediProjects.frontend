import React, { useState, useEffect } from 'react'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faEllipsis, faListCheck, faPlus, faTable, faTimeline } from '@fortawesome/free-solid-svg-icons'
import profileImagePlaceholder from '../../assets/img/profile.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { saveTask } from '../../api/tasks'

function Board({ tasks, setTasks, setSelectedTask, selectedTask,
    showTasksModal, setShowTasksModal, showAddTaskCard, setShowAddTaskCard }) {


    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const handleShowTaskModal = (task) => {
        setSelectedTask(task);
        setShowTasksModal(true);
    }

    const handleShowAddTaskCard = () => {
        setShowAddTaskCard(true);
    }

    const handleHideAddTaskCard = () => {
        setShowAddTaskCard(false);
    }

    const handleSaveTask = async () => {
        try {
            const newTask = await saveTask(subject, description);
            setTasks([newTask, ...tasks]);
            setShowAddTaskCard(false);
            setSubject('');
            setDescription('');
        } catch {

        }

    };


    return (

        <div className="row">
            <div className="col-3 p-3">
                <div className='d-flex justify-content-between'>
                    <p className='mb-3 fw-500'>
                        To do
                        <span className='text-muted fw-400 medium px-2'>
                            3
                        </span>
                    </p>
                    <div>
                        <button className='px-2 btn' onClick={handleShowAddTaskCard}>
                            <FontAwesomeIcon icon={faPlus} className='text-muted' />
                        </button>
                        <button className='px-2 btn'>
                            <FontAwesomeIcon icon={faEllipsis} className='text-muted' />
                        </button>
                    </div>
                </div>

                <div className={`bg-${tasks.filter(task => task.status === 'todo').length === 0 ? 'gray py-5' : ''} w-100 rounded`}>
                    {tasks.filter(task => task.status === 'todo').map(task => (
                        <div key={task.id} className="task-card mb-3" onClick={() => handleShowTaskModal(task)}>
                            <div className='px-1'>
                                <FontAwesomeIcon icon={faCircleCheck} className='text-muted medium pe-2' />
                                <span className='pe-2 medium'>{task.subject}</span>
                            </div>
                            <div className='pt-3 d-flex align-items-center'>
                                <div className='pe-3'>
                                    <img src={profileImagePlaceholder} className='rounded-circle' alt="" style={{ maxHeight: 25, height: '100%' }} />
                                </div>
                                <span className='small text-muted'>
                                    Apr 19
                                </span>
                            </div>
                        </div>
                    ))}
                </div>


                <div className={`task-card mb-3 ${(showAddTaskCard || tasks.length == 0) ? '' : 'd-none'}`}>
                    <div>
                        <div className='d-flex align-items-center pb-3'>
                            <FontAwesomeIcon icon={faCircleCheck} className='text-muted medium pe-2' />
                            <input
                                type="text"
                                className='border-0 rounded w-100 py-2 medium'
                                placeholder='Write a task name'
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>

                        <textarea
                            className='form-control bg-gray-light mb-2'
                            placeholder='Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className='d-flex justify-content-end w-100'>
                            <div className='pe-1'>
                                <button className='btn btn-basic border' onClick={handleHideAddTaskCard}>Dismiss</button>
                            </div>
                            <div className='ps-1'>
                                <button className='btn btn-primary' onClick={handleSaveTask}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <button className='btn py-2 rounded color-text-lighter w-100' onClick={handleShowAddTaskCard}>
                    <FontAwesomeIcon icon={faPlus} className='pe-2 medium' />
                    Add Task
                </button>

            </div>
            <div className="col-3 p-3">
                <div className='d-flex justify-content-between'>
                    <p className='mb-3 fw-500'>
                        Doing
                        <span className='text-muted fw-400 medium px-2'>
                            3
                        </span>
                    </p>
                    <div>
                        <button className='px-2 btn' onClick={handleShowAddTaskCard}>
                            <FontAwesomeIcon icon={faPlus} className='text-muted' />
                        </button>
                        <button className='px-2 btn'>
                            <FontAwesomeIcon icon={faEllipsis} className='text-muted' />
                        </button>
                    </div>
                </div>
                <div className={`bg-${tasks.filter(task => task.status === 'in_progress').length === 0 ? 'gray py-5' : ''} w-100 rounded`}>
                    {tasks.filter(task => task.status === 'in_progress').map(task => (
                        <div key={task.id} className="task-card mb-3" onClick={() => handleShowTaskModal(task)}>
                            <div className='px-1'>
                                <FontAwesomeIcon icon={faCircleCheck} className='text-muted medium pe-2' />
                                <span className='pe-2 medium'>{task.subject}</span>
                            </div>
                            <div className='pt-3 d-flex align-items-center'>
                                <div className='pe-3'>
                                    <img src={profileImagePlaceholder} className='rounded-circle' alt="" style={{ maxHeight: 25, height: '100%' }} />
                                </div>
                                <span className='small text-muted'>
                                    Apr 19
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-3 p-3">
                <div className='d-flex justify-content-between'>
                    <p className='mb-3 fw-500'>
                        On Hold
                        <span className='text-muted fw-400 medium px-2'>
                            3
                        </span>
                    </p>
                    <div>
                        <button className='px-2 btn' onClick={handleShowAddTaskCard}>
                            <FontAwesomeIcon icon={faPlus} className='text-muted' />
                        </button>
                        <button className='px-2 btn'>
                            <FontAwesomeIcon icon={faEllipsis} className='text-muted' />
                        </button>
                    </div>
                </div>
                <div className={`bg-${tasks.filter(task => task.status === 'on_hold').length === 0 ? 'gray py-5' : ''} w-100 rounded`}>
                    {tasks.filter(task => task.status === 'on_hold').map(task => (
                        <div key={task.id} className="task-card mb-3" onClick={() => handleShowTaskModal(task)}>
                            <div className='px-1'>
                                <FontAwesomeIcon icon={faCircleCheck} className='text-muted medium pe-2' />
                                <span className='pe-2 medium'>{task.subject}</span>
                            </div>
                            <div className='pt-3 d-flex align-items-center'>
                                <div className='pe-3'>
                                    <img src={profileImagePlaceholder} className='rounded-circle' alt="" style={{ maxHeight: 25, height: '100%' }} />
                                </div>
                                <span className='small text-muted'>
                                    Apr 19
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div className="col-3 p-3">
                <div className='d-flex justify-content-between'>
                    <p className='mb-3 fw-500'>
                        Done
                        <span className='text-muted fw-400 medium px-2'>
                            3
                        </span>
                    </p>
                    <div>
                        <button className='px-2 btn' onClick={handleShowAddTaskCard}>
                            <FontAwesomeIcon icon={faPlus} className='text-muted' />
                        </button>
                        <button className='px-2 btn'>
                            <FontAwesomeIcon icon={faEllipsis} className='text-muted' />
                        </button>
                    </div>
                </div>
                <div className={`bg-${tasks.filter(task => task.status === 'done').length === 0 ? 'gray py-5' : ''} w-100 rounded`}>
                    {tasks.filter(task => task.status === 'done').map(task => (
                        <div key={task.id} className="task-card mb-3" onClick={() => handleShowTaskModal(task)}>
                            <div className='px-1'>
                                <FontAwesomeIcon icon={faCircleCheck} className='text-muted medium pe-2' />
                                <span className='pe-2 medium'>{task.subject}</span>
                            </div>
                            <div className='pt-3 d-flex align-items-center'>
                                <div className='pe-3'>
                                    <img src={profileImagePlaceholder} className='rounded-circle' alt="" style={{ maxHeight: 25, height: '100%' }} />
                                </div>
                                <span className='small text-muted'>
                                    Apr 19
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Board