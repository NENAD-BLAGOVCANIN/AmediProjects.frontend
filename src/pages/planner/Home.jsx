import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../api/user';
import { getProjectInfo } from '../../api/project';
import { getTasks } from '../../api/tasks';
import { getSummaryPlanners, saveSummaryPlanners, updateSummaryPlanners } from '../../api/summaryPlanners';
import NewNotifications from '../../components/Home/NewNotifications';
import Calendar from 'react-calendar';
import EmployeePerformance from '../../components/Home/EmployeePerformance';
import PlaningTable from "../../components/planner/planingTable";
import ProductionTable from "../../components/planner/productionTable";
import AddNewMeasuring from '../../components/planner/addNewMeasuring';
import AddNewPlaning from '../../components/planner/addNewPlaning';
import MeasuringTable from '../../components/planner/measuringTable';
import TaskModal from '../../components/Tasks/TaskModal';
import DayTasksModal from '../../components/Tasks/DayTasksModal';
import { useTranslation } from 'react-i18next';
import DynamicTable from '../../components/dynamicTable';

function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [projectInfo, setProjectInfo] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showTasksModal, setShowTasksModal] = useState(false);
    const [showDayTasksModal, setShowDayTasksModal] = useState(false);
    const [tasksForDay, setTasksForDay] = useState([]);
    const [value, onChange] = useState(new Date());
    const [summaryPlanners, setSummaryPlanners] = useState([]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const fetchedUserInfo = await getUserInfo();
                setUserInfo(fetchedUserInfo);
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

        const fetchSummaryPlanners = async () => {
            try {
                const fetchedSummaryPlanners = await getSummaryPlanners();
                setSummaryPlanners(fetchedSummaryPlanners);
            } catch (error) {
                console.error('Error fetching summary planners:', error);
            }
        };

        fetchUserInfo();
        fetchProjectInfo();
        fetchTasks();
        fetchSummaryPlanners();
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

    const columns = [
        { label: 'שם פרוייקט', key: 'project_name', type: 'text' },
        { label: 'תאריך', key: 'date', type: 'date' },
        { label: 'שם מתקין', key: 'worker_name', type: 'text' },
        { label: 'מדידות', key: 'bonuses', type: 'json' },
    ];

    const handleNavigateToSummaryPlanner = () => {
        navigate('/SummaryPlanner');
    };

    return (
        <div dir="rtl" className="container-fluid">
            <div className='pt-3'>
                <h3 className='mt-3 fw-500'>{t('greeting.welcome')}, {userInfo && userInfo.name.split(" ")[0]}!</h3>
            </div>
            <div className="row pt-3">
                <div className="col-md-12">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <PlaningTable />
                    </div>
                </div>
            <div className="row pt-3">
                <div className="col-md-12">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <ProductionTable />
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
                <div className="col-md-4">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <DynamicTable
                            columns={columns}
                            data={summaryPlanners}
                            titleTable="טבלת סיכום יום תכנון"
                            onSave={saveSummaryPlanners}
                            onUpdate={updateSummaryPlanners}
                        />
                    </div>
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <button className="btn btn-primary w-100" onClick={handleNavigateToSummaryPlanner}>
                            מעבר לסיכום יום תכנון
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Home;
