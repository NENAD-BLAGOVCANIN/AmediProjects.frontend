import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../api/user';
import { getProjectInfo } from '../../api/project';
import NewNotifications from '../../components/Home/NewNotifications';
import Calendar from 'react-calendar';
import StationTable from '../../components/projectManagement/StationTable';
import { useTranslation } from 'react-i18next';
import { Line } from 'react-chartjs-2';
import { getSummaryInstallations, saveSummaryInstallation, updateSummaryInstallation } from '../../api/summaryInstalation';
import DynamicTable from '../../components/dynamicTable';

function ProjectManagement() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [projectInfo, setProjectInfo] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [value, onChange] = useState(new Date());

  const [workerName, setWorkerName] = useState('');
  const [summaryInstallations, setSummaryInstallations] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [date, setDate] = useState('');
  const [selectedBonuses, setSelectedBonuses] = useState({});

  useEffect(() => {
    const fetchSummaryInstallations = async () => {
      try {
        const data = await getSummaryInstallations();
        setSummaryInstallations(data);
      } catch (error) {
        console.error('Failed to fetch summary installations', error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const fetchedUserInfo = await getUserInfo();
        setUserInfo(fetchedUserInfo);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    }

    const fetchProjectInfo = async () => {
      try {
        const fetchedProjectInfo = await getProjectInfo();
        setProjectInfo(fetchedProjectInfo);
      } catch (error) {
        console.error('Error fetching :', error);
      }
    };

    fetchSummaryInstallations();
    fetchUserInfo();
    fetchProjectInfo();
  }, []);

  const columns = [
    { label: 'שם פרוייקט', key: 'project_name', type: 'text' },
    { label: 'תאריך', key: 'date', type: 'date' },
    { label: 'שם מתקין', key: 'worker_name', type: 'text' },
    { label: 'התקנות', key: 'bonuses', type: 'json' },
  ];

  const lineChartData = {
    labels: ['ינואר', 'פרבואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
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

  const handleNavigateToBonuses = () => {
    navigate('/bonuses');
  };

  return (
    <div dir="rtl" className="container-fluid">
      <div className='pt-3'>
        <h3 className='mt-3 fw-500'>{t('greeting.welcome')}, {userInfo && userInfo.name.split(" ")[0]}!</h3>
      </div>

      <div className="row pt-3">
        <div className="col-md-12">
          <div className="bg-white rounded p-3 mt-3 shadow-sm">
            <StationTable />
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-white rounded p-3 mt-3 shadow-sm">
            <DynamicTable
              columns={columns}
              data={summaryInstallations}
              titleTable="טבלת סיכום יום"
              onSave={saveSummaryInstallation}
              onUpdate={updateSummaryInstallation}
            />
          </div>
          <div className="bg-white rounded p-3 mt-3 shadow-sm">
            <button className="btn btn-primary w-100" onClick={handleNavigateToBonuses}>
              מעבר לסיכום יום התקנות
            </button>
          </div>
        </div>
        <div className="col-md-8">
          <div className="bg-white rounded p-3 mt-3 shadow-sm">
            <Line data={lineChartData} options={options} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-white rounded p-3 mt-3 shadow-sm">
            <h6 className='bold mb-3'>{t('card_title.my_calendar')}</h6>
            <Calendar onChange={onChange} value={value} className="w-100 border-0 px-4 my-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectManagement;
