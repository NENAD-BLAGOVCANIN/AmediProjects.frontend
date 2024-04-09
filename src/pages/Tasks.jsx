import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { getTasks, saveTask } from '../api/tasks'
import TaskModal from '../components/TaskModal'
import { getProjectMembers } from '../api/project';

function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState([]);
    const [showTasksModal, setShowTasksModal] = useState(false);
    const [showAddTaskCard, setShowAddTaskCard] = useState(false);
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [projectMembers, setProjectMembers] = useState([]);

    useEffect(() => {

        const fetchMembers = async () => {

            try {
                const fetchedProjectMembers = await getProjectMembers();
                setProjectMembers(fetchedProjectMembers);
            } catch (error) {
                console.error('Error fetching :', error);
            }

        };

        fetchMembers();

        const fetchTasks = async () => {
            try {
                const fetchedTasks = await getTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchTasks();
    }, []);

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
        <div className='page-content-wrapper'>

            <Sidebar />

            <div className='main-content-wrapper'>

                <Header pageTitle="Tasks" />

                <div className='main-container'>

                    <div className="row">
                        <div className="col-4 p-3">
                            <div className='rounded text-center mb-3 py-2' style={{backgroundColor: '#B4EBFF'}}>
                                TODO
                            </div>
                            {tasks.filter(task => task.status === 'todo').map(task => (
                                <div key={task.id} className="task-card card mb-3" onClick={() => handleShowTaskModal(task)}>
                                    <div className=''>
                                        <h5 className='pe-2'>{task.subject}</h5>
                                        <span className='text-muted'>{task.description}</span>
                                    </div>
                                </div>
                            ))}

                            <div className={`task-card card mb-3 ${(showAddTaskCard || tasks.length == 0) ? '' : 'd-none'}`}>
                                <div className=''>
                                    <input
                                        type="text"
                                        className='form-control bg-gray-light mb-2'
                                        placeholder='Subject'
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
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

                            <button className='btn btn-dark py-2 rounded w-100' onClick={handleShowAddTaskCard}>
                                Add Task
                            </button>

                        </div>
                        <div className="col-4 p-3">
                            <div className='rounded text-center mb-3 py-2' style={{backgroundColor: '#EBFFB4'}}>
                                IN PROGRESS
                            </div>
                            {tasks.filter(task => task.status === 'in_progress').map(task => (
                                <div key={task.id} className="task-card card mb-3" onClick={() => handleShowTaskModal(task)}>
                                    <div className=''>
                                        <h5 className='pe-2'>{task.subject}</h5>
                                        <span className='text-muted'>{task.description}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-4 p-3">
                            <div className='rounded text-center mb-3 py-2' style={{backgroundColor: '#B4FFD2'}}>
                                DONE
                            </div>
                            {tasks.filter(task => task.status === 'done').map(task => (
                                <div key={task.id} className="task-card card mb-3" onClick={() => handleShowTaskModal(task)}>
                                    <div className=''>
                                        <h5 className='pe-2'>{task.subject}</h5>
                                        <span className='text-muted'>{task.description}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>


            <TaskModal
                showTasksModal={showTasksModal}
                setShowTasksModal={setShowTasksModal}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                tasks={tasks}
                setTasks={setTasks}
                projectMembers={projectMembers}
                setProjectMembers={setProjectMembers}
            />


        </div>
    )
}

export default Tasks