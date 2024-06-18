import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../../api/user';
import { getTasks } from '../../api/tasks';
import Calendar from 'react-calendar';
import { Line } from 'react-chartjs-2';
import ProjectAmountTable from '../../components/collection/projectAmountTable';
import { useTranslation } from 'react-i18next';
import TaskModal from '../../components/Tasks/TaskModal';
import DayTasksModal from '../../components/Tasks/DayTasksModal'; // Import DayTasksModal component

function Home() {
    const { t } = useTranslation();
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
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        const fetchTasks = async () => {
            try {
                const fetchedTasks = await getTasks();
                setTasks(fetchedTasks.filter(task => task.status === 'todo')); // Filter tasks with 'todo' status
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchUserInfo();
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

    const lineChartData = {
        labels: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
        datasets: [
            {
                label: 'סכום הגבייה לפי חודש',
                data: [1, 3, 10, 7, 8, 12, 15, 15, 13, 14, 12, 17, 21, 23, 18],
                fill: true,
                backgroundColor: 'rgba(0,110,220, 0.2)',
                borderColor: 'rgb(0,110,220)',
                tension: 0.4,
            },
        ],
    };
    const projectData = [
        { name: 'פרוייקט אלפא', status: 'ממתין לתשלום', amount: '$5000' },
        { name: 'פרוייקט בטא', status: 'נשלחה בקשה לתשלום', amount: '$3000' },
        // Add more projects here
    ];
    const options = {
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div dir="rtl" className="container">
            <div className='pt-3'>
                <h3 className='mt-3 fw-500'>{t('greeting.welcome')}, {userInfo && userInfo.name.split(" ")[0]}!</h3>
            </div>
            <div className="row pt-3">
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
                    <div className="bg-white rounded p-3 shadow-sm">
                        <h5>סה"כ הכסף שיש לגבות</h5>
                        <h6>15,000</h6>
                    </div>
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h5>הכסף שנגבה</h5>
                        <h6>23,481</h6>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <ProjectAmountTable projects={projectData} />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <Line data={lineChartData} options={options} />
                    </div>
                </div>
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
