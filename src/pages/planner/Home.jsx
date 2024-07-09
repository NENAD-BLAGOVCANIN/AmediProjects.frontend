import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../../api/user';
import { getProjectInfo } from '../../api/project';
import { getTasks } from '../../api/tasks';
import NewNotifications from '../../components/Home/NewNotifications';
import Calendar from 'react-calendar';
import EmployeePerformance from '../../components/Home/EmployeePerformance';
import PlaningTable from "../../components/planner/planingTable";
import AddNewMeasuring from '../../components/planner/addNewMeasuring';
import AddNewPlaning from '../../components/planner/addNewPlaning';
import MeasuringTable from '../../components/planner/measuringTable';
import TaskModal from '../../components/Tasks/TaskModal';
import DayTasksModal from '../../components/Tasks/DayTasksModal';
import { useTranslation } from 'react-i18next';

function Home() {
    const { t } = useTranslation();
    const [projectInfo, setProjectInfo] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showTasksModal, setShowTasksModal] = useState(false);
    const [showDayTasksModal, setShowDayTasksModal] = useState(false);
    const [tasksForDay, setTasksForDay] = useState([]);
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const fetchedUserInfo = await getUserInfo();
                setUserInfo(fetchedUserInfo);
                console.log(fetchedUserInfo);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        const fetchProjectInfo = async () => {
            try {
                const fetchedProjectInfo = await getProjectInfo();
                setProjectInfo(fetchedProjectInfo);
            } catch (error) {
                console.error('Error fetching project info:', error);
            }
        };

        const fetchTasks = async () => {
            try {
                const fetchedTasks = await getTasks();
                setTasks(fetchedTasks.filter(task => task.status === 'todo'));
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchUserInfo();
        fetchProjectInfo();
        fetchTasks();
    }, []);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setShowTasksModal(true);
    };

    const handleDayClick = (date) => {
        const tasksForSelectedDay = tasks.filter(task => {
            const taskDate = new Date(task.due_date).toDateString();
            return taskDate === date.toDateString();
        });
        setTasksForDay(tasksForSelectedDay);
        setShowDayTasksModal(true);
    };

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };

    // fake data
    const leadsData = [
        { name: 'הפרויקט של יוסי', status: 'הסתיים' },
        { name: 'הבית של רביב', status: 'בבדיקה' },
        // Add more leads here
    ];

    return (
        <div dir="rtl" className="container">
            <div className='pt-3'>
                <h3 className='mt-3 fw-500'>{t('greeting.welcome')}, {userInfo && userInfo.name.split(" ")[0]}!</h3>
            </div>
            <div className="row pt-3">
                <div className="col-md-6">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <MeasuringTable />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <PlaningTable />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h6 className='bold mb-3'>{t('card_title.late_tasks')}</h6>
                        {tasks.length === 0 ? (
                            <p className='py-5 text-center'>You have no late tasks 😊</p>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map(task => (
                                        <tr key={task.id} onClick={() => handleTaskClick(task)}>
                                            <td>{task.subject}</td>
                                            <td>{new Date(task.due_date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h6 className='bold mb-3'>{t('card_title.my_calendar')}</h6>
                        <Calendar
                            onChange={onChange}
                            value={value}
                            className="w-100 border-0 px-4 my-4"
                            tileContent={({ date, view }) => {
                                if (view === 'month') {
                                    const dayTasks = tasks.filter(task => {
                                        const taskDate = new Date(task.due_date).toDateString();
                                        return taskDate === date.toDateString();
                                    });
                                    return dayTasks.length > 0 ? <span className="dot"></span> : null;
                                }
                            }}
                            onClickDay={handleDayClick}
                        />
                    </div>
                </div>
                {/* <div className="col-md-4">
                    <div className="bg-white rounded p-3 shadow-sm">
                        <AddNewMeasuring />
                    </div>
                </div> */}
                {/* <div className="col-md-4">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <AddNewPlaning />
                    </div>
                </div> */}
            </div>
            {showTasksModal && selectedTask && (
                <TaskModal
                    showTasksModal={showTasksModal}
                    setShowTasksModal={setShowTasksModal}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTask}
                    tasks={tasks}
                    setTasks={setTasks}
                />
            )}
            {showDayTasksModal && (
                <DayTasksModal
                    showDayTasksModal={showDayTasksModal}
                    setShowDayTasksModal={setShowDayTasksModal}
                    tasksForDay={tasksForDay}
                    handleTaskClick={handleTaskClick}
                />
            )}
        </div>
    );
}

export default Home;
