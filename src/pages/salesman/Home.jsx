import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../../api/user';
import { getProjectInfo, getMyProjects } from '../../api/project';
import { getTasks } from '../../api/tasks';
import { getContacts, saveContact, updateContact, deleteContact } from '../../api/contacts';
import Calendar from 'react-calendar';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import TaskModal from '../../components/Tasks/TaskModal';
import DayTasksModal from '../../components/Tasks/DayTasksModal';
import AddContactModal from '../../components/contacts/AddContactModal';
import EditContactModal from '../../components/contacts/EditContactModal';

import ContactTable from './ContactTable';
function Home() {
    const { t } = useTranslation();
    const [projectInfo, setProjectInfo] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [value, onChange] = useState(new Date());
    const [myProjects, setMyProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showTasksModal, setShowTasksModal] = useState(false);
    const [showDayTasksModal, setShowDayTasksModal] = useState(false);
    const [tasksForDay, setTasksForDay] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [showAddContactModal, setShowAddContactModal] = useState(false);
    const [showEditContactModal, setShowEditContactModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

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
        const fetchMyProjects = async () => {
            try {
                const fetchedMyProjects = await getMyProjects();
                setMyProjects(fetchedMyProjects);
            } catch (error) {
                console.error('Error fetching projects:', error);
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
        const fetchContacts = async () => {
            try {
                const fetchedContacts = await getContacts();
                setContacts(fetchedContacts);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchMyProjects();
        fetchUserInfo();
        fetchProjectInfo();
        fetchTasks();
        fetchContacts();
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

    const handleNewProjectClick = () => {
        window.open('/newProject', '_blank');
    };

    const handleAddContact = () => {
        setShowAddContactModal(true);
    };

    const handleEditContact = (contact) => {
        setSelectedContact(contact);
        setShowEditContactModal(true);
    };

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };

    const lineChartData = {
        labels: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
        datasets: [
            {
                label: 'כמות פרוייקטים פי חודשים',
                data: [1, 3, 10, 7, 8, 12, 15, 15, 13, 14, 12, 17, 21, 23, 18],
                fill: true,
                backgroundColor: 'rgba(0,158,253, 0.2)',
                borderColor: 'rgb(0,158,253)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    const leadsData = [
        { name: 'John Doe', phone: '123-456-7890', status: 'Interested', companyName: 'ABC Corp', lastContact: '2024-05-20' },
        { name: 'Jane Smith', phone: '987-654-3210', status: 'Not Interested', companyName: 'XYZ Inc', lastContact: '2024-05-18' },
    ];

    return (
        <div dir="rtl" className="container">
            <div className='pt-3'>
                <h3 className='mt-3 fw-500'>{t('greeting.welcome')}, {userInfo && userInfo.name.split(" ")[0]}!</h3>
            </div>
            <div className="row pt-3">
            <div className="col-md-12">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                    <ContactTable 
                        contacts={contacts}
                        setContacts={setContacts}
                        onEditContact={handleEditContact}
                        onAddContact={handleAddContact}
                        />
                         <EditContactModal
                contacts={contacts}
                setContacts={setContacts}
                selectedContact={selectedContact}
                setSelectedContact={setSelectedContact}
                showEditContactModal={showEditContactModal}
                setShowEditContactModal={setShowEditContactModal}
            />
                    </div>
                </div>
              
                <div className="col-md-6">
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
                <div className="col-md-6">
                    <div className="bg-white rounded p-3 shadow-sm">
                        <h6 className='bold mb-3'>{t('card_title.current_project')}</h6>
                        {myProjects.map((myProject) => (
                            <div key={myProject.id}>שם פרוייקט {myProject.name} , סטטוס {myProject.status}</div>
                        ))}
                    </div>
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <button className="btn btn-primary w-100" onClick={handleNewProjectClick}>
                            הוספת פרוייקט חדש
                        </button>
                    </div>
                </div>
                <div className="col-md-12 p-3">
                    <div className="bg-white p-3 rounded d-flex justify-content-center flex-column w-100">
                        <h5 className="mb-3">הוספת פרוייקט חדש</h5>
                        <div className="m-auto w-100 h-50 d-flex justify-content-center text-center">
                            <Line data={lineChartData} options={options} />
                        </div>
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