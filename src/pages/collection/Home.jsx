import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../../api/user';
import { getTasks } from '../../api/tasks';
import { getSumOfDebt } from '../../api/collections';
import Calendar from 'react-calendar';
import { Line } from 'react-chartjs-2';
import ProjectAmountTable from '../../components/collection/projectAmountTable';
import { useTranslation } from 'react-i18next';
import TaskModal from '../../components/Tasks/TaskModal';
import { getSummaryDays, saveSummaryDay, updateSummaryDay } from '../../api/summaryDay';
import DynamicTable from '../../components/dynamicTable';
import PdfFormModal from '../../components/collection/PdfFormModal';
import AccountDetailsPdfModal from '../../components/collection/AccountDetailsPdfModal';
import  ProjectCollectionsTable  from '../../components/collection/ProjectCollectionsTable';
import { generatePdf, generateAccountDetailsPdf } from '../../api/pdf';
import DayTasksModal from '../../components/Tasks/DayTasksModal';
import MonthlyCollectionTable from '../../components/collection/MonthlyCollectionTable';
const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function Home() {
    const { t } = useTranslation();
    const [userInfo, setUserInfo] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showTasksModal, setShowTasksModal] = useState(false);
    const [showDayTasksModal, setShowDayTasksModal] = useState(false);
    const [tasksForDay, setTasksForDay] = useState([]);
    const [value, onChange] = useState(new Date());
    const [sumOfDebt, setSumOfDebt] = useState(0);
    const [summaryDays, setSummaryDays] = useState([]);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [showAccountDetailsPdfModal, setShowAccountDetailsPdfModal] = useState(false);

    const columns = [
        { label: 'מספר', key: 'id', type: 'number' },
        { label: 'כותרת', key: 'title', type: 'text' },
        { label: 'בעיות', key: 'problems', type: 'text' },
        { label: 'כמה נגבה היום', key: 'collected_today', type: 'text' },
        { label: 'כמה עתיד להגבות', key: 'future_collection', type: 'text' },
        { label: 'תאריך סיכום יום', key: 'created_at', type: 'date' },
    ];

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const fetchedUserInfo = await getUserInfo();
                setUserInfo(fetchedUserInfo);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };
        const fetchSummaryDays = async () => {
            try {
                const fetchedSummaryDays = await getSummaryDays();
                setSummaryDays(fetchedSummaryDays);
            } catch (error) {
                console.error('Error fetching summary days:', error);
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

        const fetchSumOfDebt = async () => {
            try {
                const sum = await getSumOfDebt();
                setSumOfDebt(sum);
            } catch (error) {
                console.error('Error fetching sum of debt:', error);
            }
        };

        fetchUserInfo();
        fetchTasks();
        fetchSumOfDebt();
        fetchSummaryDays();
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

    const handleGeneratePdf = async (formData) => {
        try {
            const response = await generatePdf(formData);
            const pdfBlob = new Blob([new Uint8Array(response.data)], { type: 'application/pdf' });
            const downloadUrl = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'document.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setShowPdfModal(false);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    const handleGenerateAccountDetailsPdf = async (formData) => {
        try {
            const response = await generateAccountDetailsPdf(formData);
            const pdfBlob = new Blob([new Uint8Array(response.data)], { type: 'application/pdf' });
            const downloadUrl = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'account-details.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setShowAccountDetailsPdfModal(false);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
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

    const handleClose = () => {
        console.log('Closing modal');
        setShowPdfModal(false);
        setShowAccountDetailsPdfModal(false);
    };

    return (
        <div dir="rtl" className="container-fluid">
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
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h5>סה"כ הכסף שיש לגבות</h5>
                        <h6>{formatNumberWithCommas(sumOfDebt)}</h6>
                    </div>
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <h5>מעבר לדף סיכום יום</h5>
                        <a href="/daySummary" className="btn btn-primary">דף סיכום יום</a>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <MonthlyCollectionTable />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <ProjectAmountTable />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                         <ProjectCollectionsTable />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <DynamicTable 
                            columns={columns} 
                            data={summaryDays} 
                            onSave={saveSummaryDay}
                            onUpdate={updateSummaryDay}
                            titleTable='טבלת סיכום יום'
                        />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="bg-white rounded p-3 mt-3 shadow-sm">
                        <button className="btn btn-primary" onClick={() => setShowPdfModal(true)}>
                            יצירת הצעת מחיר
                        </button>
                        <button className="btn btn-secondary ml-3" onClick={() => setShowAccountDetailsPdfModal(true)}>
                            יצירת פירוט חשבון
                        </button>
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
            {showPdfModal && (
                <PdfFormModal
                    show={showPdfModal}
                    onHide={handleClose}
                    handleClose={() => setShowPdfModal(false)}
                    onSubmit={handleGeneratePdf} // Pass the handleGeneratePdf function to the modal
                />
            )}
            {showAccountDetailsPdfModal && (
                <AccountDetailsPdfModal
                    show={showAccountDetailsPdfModal}
                    onHide={handleClose}
                    handleClose={() => setShowAccountDetailsPdfModal(false)}
                    onSubmit={handleGenerateAccountDetailsPdf} // Pass the handleGenerateAccountDetailsPdf function to the modal
                />
            )}
        </div>
    );
}

export default Home;

