import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header/Header';
import { getTasks, saveTask } from '../api/tasks';
import TaskModal from '../components/Tasks/TaskModal';
import { getUsers } from '../api/user'; // Updated import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faListCheck, faPlus, faTable, faTimeline } from '@fortawesome/free-solid-svg-icons';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Board from '../components/Tasks/Board';
import BoardByDay from '../components/Tasks/calendar';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState([]);
    const [showTasksModal, setShowTasksModal] = useState(false);
    const [showAddTaskCard, setShowAddTaskCard] = useState(false);
    const [projectMembers, setProjectMembers] = useState([]);
    const [selectedTaskableId, setSelectedTaskableId] = useState(''); // Add this state

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const fetchedUsers = await getUsers(); // Updated function call
                setProjectMembers(fetchedUsers);
                
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        
        fetchMembers();

        const fetchTasks = async () => {
            try {
                const fetchedTasks = await getTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <>
            <div className="container p-2">
                <Tabs defaultActiveKey="board" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="board" title={<><FontAwesomeIcon icon={faTable} /><span className='p-2'>לוח</span></>}>
                        <Board
                            tasks={tasks} setTasks={setTasks}
                            selectedTask={selectedTask} setSelectedTask={setSelectedTask}
                            showTasksModal={showTasksModal} setShowTasksModal={setShowTasksModal}
                            showAddTaskCard={showAddTaskCard} setShowAddTaskCard={setShowAddTaskCard}
                            setSelectedTaskableId={setSelectedTaskableId} // Pass the function here
                        />
                    </Tab>
                    <Tab eventKey="timeline" title={<><FontAwesomeIcon icon={faTimeline} /><span className='p-2'>יומן</span></>}>
                        <BoardByDay
                            tasks={tasks} setTasks={setTasks}
                            selectedTask={selectedTask} setSelectedTask={setSelectedTask}
                            showTasksModal={showTasksModal} setShowTasksModal={setShowTasksModal}
                            showAddTaskCard={showAddTaskCard} setShowAddTaskCard={setShowAddTaskCard}
                        />
                    </Tab>
                </Tabs>

                <TaskModal className='p-2'
                    showTasksModal={showTasksModal}
                    setShowTasksModal={setShowTasksModal}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTask}
                    tasks={tasks}
                    setTasks={setTasks}
                    projectMembers={projectMembers}
                    setProjectMembers={setProjectMembers}
                    setSelectedTaskableId={setSelectedTaskableId} // Pass it to CreateTaskCard

                />
            </div>
        </>
    );
}

export default Tasks;
