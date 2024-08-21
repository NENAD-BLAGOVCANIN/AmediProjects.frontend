import React, { useState, useEffect } from "react";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveTask } from "../../api/tasks"; // Adjust this import path as necessary
import { getUsers } from "../../api/user"; // Adjust this import path as necessary
import TaskCard from "./TaskCard";
import CreateTaskCard from "./CreateTaskCard";
import moment from 'moment';
import 'moment/locale/he'; // Import Hebrew locale

moment.locale('he'); // Set the locale to Hebrew

function BoardByDay({
  tasks,
  setTasks,
  setSelectedTask,
  selectedTask,
  showTasksModal,
  setShowTasksModal,
  showAddTaskCard,
  setShowAddTaskCard,
}) {
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectMembers, setProjectMembers] = useState([]); // State to store fetched users
  const [assignee, setAssignee] = useState(null); // State for selected assignee
  const [loading, setLoading] = useState(true); // Loading state to handle async data

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await getUsers(); // Fetch users from the API
        setProjectMembers(users); // Update the state with fetched users
        setLoading(false); // Set loading to false after fetching users
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setLoading(false); // Also stop loading in case of an error
      }
    }

    fetchUsers(); // Call the function to fetch users on component mount
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleShowTaskModal = (task) => {
    setSelectedTask(task);
    setShowTasksModal(true);
  };

  const handleShowAddTaskCard = () => {
    setShowAddTaskCard(true);
  };

  const handleHideAddTaskCard = () => {
    setShowAddTaskCard(false);
  };

  const handleSaveTask = async () => {
    try {
      const newTask = await saveTask(subject, description, dueDate);
      setTasks([newTask, ...tasks]);
      setShowAddTaskCard(false);
      setSubject("");
      setDescription("");
      setEmail("");
      setPhone("");
      setAssignee(null); // Reset assignee after saving task
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  const categorizedTasks = {
    beforeToday: tasks.filter(task => moment(task.due_date).isBefore(moment(), 'day')),
    yesterday: tasks.filter(task => moment(task.due_date).isSame(moment().subtract(1, 'days'), 'day')),
    today: tasks.filter(task => moment(task.due_date).isSame(moment(), 'day')),
    tomorrow: tasks.filter(task => moment(task.due_date).isSame(moment().add(1, 'days'), 'day')),
    dayAfterTomorrow: tasks.filter(task => moment(task.due_date).isSame(moment().add(2, 'days'), 'day')),
    twoDaysAfterTomorrow: tasks.filter(task => moment(task.due_date).isSame(moment().add(3, 'days'), 'day')),
    threeDaysAfterTomorrow: tasks.filter(task => moment(task.due_date).isSame(moment().add(4, 'days'), 'day')),
  };

  // Define columns with labels that include day of the week and date in Hebrew
  const columns = [
    { id: 'beforeToday', label: `משימות ישנות יותר`, tasks: categorizedTasks.beforeToday },
    { id: 'yesterday', label: `${moment().subtract(1, 'days').format('dddd, DD/MM/YYYY')}`, tasks: categorizedTasks.yesterday },
    { id: 'today', label: `היום - ${moment().format('dddd, DD/MM/YYYY')}`, tasks: categorizedTasks.today },
    { id: 'tomorrow', label: `${moment().add(1, 'days').format('dddd, DD/MM/YYYY')}`, tasks: categorizedTasks.tomorrow },
    { id: 'dayAfterTomorrow', label: `${moment().add(2, 'days').format('dddd, DD/MM/YYYY')}`, tasks: categorizedTasks.dayAfterTomorrow },
    { id: 'twoDaysAfterTomorrow', label: `${moment().add(3, 'days').format('dddd, DD/MM/YYYY')}`, tasks: categorizedTasks.twoDaysAfterTomorrow },
    { id: 'threeDaysAfterTomorrow', label: `${moment().add(4, 'days').format('dddd, DD/MM/YYYY')}`, tasks: categorizedTasks.threeDaysAfterTomorrow },
  ];

  return (
    <div className="row">
      {columns.map((column, index) => (
        <div className="col-2 p-3" key={index} style={{ borderRight: '1px solid #ddd' }}>
          <div className="d-flex justify-content-between">
            <p className="mb-3 fw-500">
              {column.label}
              <span className="text-muted fw-400 medium px-2">{column.tasks.length}</span>
            </p>
            <div>
              <button className="px-2 btn" onClick={handleShowAddTaskCard}>
                <FontAwesomeIcon icon={faPlus} className="text-muted" />
              </button>
              <button className="px-2 btn">
                <FontAwesomeIcon icon={faEllipsis} className="text-muted" />
              </button>
            </div>
          </div>
          <div className={`bg-${column.tasks.length === 0 ? "gray py-5" : ""} w-100 rounded`}>
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                handleShowTaskModal={handleShowTaskModal}
                dueDateFormatted={moment(task.due_date).format('dddd, DD/MM/YYYY')}
              />
            ))}
          </div>
        </div>
      ))}

      {!loading && (
        <CreateTaskCard
          showAddTaskCard={showAddTaskCard}
          tasks={tasks}
          subject={subject}
          setSubject={setSubject}
          dueDate={dueDate}
          setDueDate={setDueDate}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          description={description}
          setDescription={setDescription}
          assignee={assignee} // Pass the selected assignee
          setAssignee={setAssignee} // Handler to set assignee
          status={selectedTask ? selectedTask.status : ""}
          setStatus={(newStatus) => setSelectedTask({ ...selectedTask, status: newStatus })}
          projectMembers={projectMembers} // Pass the fetched users to CreateTaskCard
          handleHideAddTaskCard={handleHideAddTaskCard}
          handleSaveTask={handleSaveTask}
        />
      )}

      {loading && <p>Loading...</p>}

      <button
        className="btn btn-primary py-2 rounded w-100 medium"
        onClick={handleShowAddTaskCard}
      >
        <FontAwesomeIcon icon={faPlus} className="pe-2 medium" />
        הוסף משימה
      </button>
    </div>
  );
}

export default BoardByDay;
