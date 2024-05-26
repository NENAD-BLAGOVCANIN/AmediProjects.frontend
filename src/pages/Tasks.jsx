import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header/Header'
import { getTasks, saveTask } from '../api/tasks'
import TaskModal from '../components/Tasks/TaskModal'
import { getProjectMembers } from '../api/project';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faEllipsis, faListCheck, faPlus, faTable, faTimeline } from '@fortawesome/free-solid-svg-icons'
import profileImagePlaceholder from '../assets/img/profile.svg'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Board from '../components/Tasks/Board'
import TasksTimeline from '../components/Tasks/Timeline'
import List from '../components/Tasks/List'
import { useTranslation } from 'react-i18next';

function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState([]);
    const [showTasksModal, setShowTasksModal] = useState(false);
    const [showAddTaskCard, setShowAddTaskCard] = useState(false);

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



    return (

        <>
        <div className="container p-2">

            <Tabs
                defaultActiveKey="board"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="board" title={
                    <>
                        <FontAwesomeIcon icon={faTable} />
                        <span className='p-2'>לוח</span>
                    </>
                }>
                    <Board
                        tasks={tasks} setTasks={setTasks}
                        selectedTask={selectedTask} setSelectedTask={setSelectedTask}
                        showTasksModal={showTasksModal} setShowTasksModal={setShowTasksModal}
                        showAddTaskCard={showAddTaskCard} setShowAddTaskCard={setShowAddTaskCard}
                    />
                </Tab>
                <Tab eventKey="timeline" title={
                    <>
                        <FontAwesomeIcon icon={faTimeline} />
                        <span className='p-2'>זמנים</span>
                    </>
                }>
                    <TasksTimeline
                        tasks={tasks} setTasks={setTasks}
                        selectedTask={selectedTask} setSelectedTask={setSelectedTask}
                        showTasksModal={showTasksModal} setShowTasksModal={setShowTasksModal}
                        showAddTaskCard={showAddTaskCard} setShowAddTaskCard={setShowAddTaskCard}
                    />
                </Tab>
                <Tab eventKey="list" title={
                    <>
                        <FontAwesomeIcon icon={faListCheck} />
                        <span className='p-2'>רשימה</span>
                    </>
                }>
                    <List className='p-2'
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
            />
        </div>


        </>

    )
}

export default Tasks