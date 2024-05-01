import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header/Header'
import { getTasks, saveTask } from '../api/tasks'
import TaskModal from '../components/TaskModal'
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
            <Tabs
                defaultActiveKey="board"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="board" title={
                    <>
                        <FontAwesomeIcon icon={faTable} />
                        <span className='ps-2'>Board</span>
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
                        <span className='ps-2'>Timeline</span>
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
                        <span className='ps-2'>List</span>
                    </>
                }>
                    <List
                        tasks={tasks} setTasks={setTasks}
                        selectedTask={selectedTask} setSelectedTask={setSelectedTask}
                        showTasksModal={showTasksModal} setShowTasksModal={setShowTasksModal}
                        showAddTaskCard={showAddTaskCard} setShowAddTaskCard={setShowAddTaskCard}
                    />
                </Tab>
            </Tabs>


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


        </>

    )
}

export default Tasks