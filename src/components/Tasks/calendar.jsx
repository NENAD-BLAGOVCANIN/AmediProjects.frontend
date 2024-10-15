import React, { useState, useEffect } from "react";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveTask, updateTask } from "../../api/tasks"; // Adjust this import path as necessary
import { getUsers } from "../../api/user"; // Adjust this import path as necessary
import TaskCard from "./TaskCard";
import CreateTaskCalendar from "./CreateTaskCalendar";
import moment from 'moment';
import 'moment/locale/he'; // Import Hebrew locale
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  // State to track the current week
  const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week'));

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
  }, [tasks]); // Empty dependency array ensures this runs only once on mount

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
    const  savedTask = {
      subject: subject,
      description: description,
      due_date: dueDate,
      phone: phone,
      email: email,
      assigned_to: assignee,
    };
    try {
      const newTask = await saveTask(savedTask);
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

  // Categorize tasks for the selected week
  const categorizedTasks = {
    beforeToday: tasks.filter(task => moment(task.due_date).isBefore(currentWeekStart, 'day')),
    yesterday: tasks.filter(task => moment(task.due_date).isSame(currentWeekStart.clone().subtract(1, 'days'), 'day')),
    today: tasks.filter(task => moment(task.due_date).isSame(currentWeekStart, 'day')),
    tomorrow: tasks.filter(task => moment(task.due_date).isSame(currentWeekStart.clone().add(1, 'days'), 'day')),
    dayAfterTomorrow: tasks.filter(task => moment(task.due_date).isSame(currentWeekStart.clone().add(2, 'days'), 'day')),
    twoDaysAfterTomorrow: tasks.filter(task => moment(task.due_date).isSame(currentWeekStart.clone().add(3, 'days'), 'day')),
    threeDaysAfterTomorrow: tasks.filter(task => moment(task.due_date).isSame(currentWeekStart.clone().add(4, 'days'), 'day')),
  };

  // Handle drag and drop
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
        return;
    }

    const draggedTask = tasks.find((task) => task.id === parseInt(result.draggableId));
    if (!draggedTask) return;

    let newDueDate;
    switch (destination.droppableId) {
        case 'beforeToday':
            newDueDate = currentWeekStart.clone().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss');
            break;
        case 'yesterday':
            newDueDate = currentWeekStart.clone().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss');
            break;
        case 'today':
            newDueDate = currentWeekStart.format('YYYY-MM-DD HH:mm:ss');
            break;
        case 'tomorrow':
            newDueDate = currentWeekStart.clone().add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
            break;
        case 'dayAfterTomorrow':
            newDueDate = currentWeekStart.clone().add(2, 'days').format('YYYY-MM-DD HH:mm:ss');
            break;
        case 'twoDaysAfterTomorrow':
            newDueDate = currentWeekStart.clone().add(3, 'days').format('YYYY-MM-DD HH:mm:ss');
            break;
        case 'threeDaysAfterTomorrow':
            newDueDate = currentWeekStart.clone().add(4, 'days').format('YYYY-MM-DD HH:mm:ss');
            break;
        default:
            return;
    }

    const updatedTask = { ...draggedTask, due_date: newDueDate };

    // Update the task in the backend
    try {
        await updateTask(updatedTask);
        const updatedTasks = tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks);
    } catch (error) {
        console.error("Failed to update task:", error);
    }
};


  
  // Functions to navigate weeks
  const goToPreviousWeek = () => {
    setCurrentWeekStart(prev => prev.clone().subtract(1, 'week'));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(prev => prev.clone().add(1, 'week'));
  };

  const renderColumn = (id, label, tasks) => (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          className="col-2 p-3"
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ borderRight: '1px solid #ddd' }}
        >
          <div className="d-flex justify-content-between">
            <p className="mb-3 fw-500">
              {label}
              <span className="text-muted fw-400 medium px-2">{tasks.length}</span>
            </p>
          </div>
          <div className={`bg-${tasks.length === 0 ? "gray py-5" : ""} w-100 rounded`}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={snapshot.isDragging ? "dragging" : ""}
                  >
                    <TaskCard
                      task={task}
                      handleShowTaskModal={handleShowTaskModal}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );

  // Define columns with labels that include day of the week and date in Hebrew
  const columns = [
    { id: 'beforeToday', label: `${currentWeekStart.clone().subtract(2, 'days').format('dddd, DD/MM/YYYY')}`, tasks: categorizedTasks.beforeToday },
    { id: 'yesterday', label: `${currentWeekStart.clone().subtract(1, 'days').format('dddd, DD/MM/YYYY')}`, tasks: categorizedTasks.yesterday },
    { id: 'today', label: `היום - ${currentWeekStart.format('dddd, DD/MM/YYYY')}`, tasks: categorizedTasks.today },
    { id: 'tomorrow', label: `${currentWeekStart.clone().add(1, 'days').format('dddd, DD/MM/YYYY')}`, tasks: categorizedTasks.tomorrow },
    { id: 'dayAfterTomorrow', label: `${currentWeekStart.clone().add(2, 'days').format('dddd, DD/MM/YYYY')}`, tasks: categorizedTasks.dayAfterTomorrow },
    { id: 'twoDaysAfterTomorrow', label: `${currentWeekStart.clone().add(3, 'days').format('dddd, DD/MM/YYYY')}`, tasks: categorizedTasks.twoDaysAfterTomorrow },
    { id: 'threeDaysAfterTomorrow', label: `${currentWeekStart.clone().add(4, 'days').format('dddd, DD/MM/YYYY')}`, tasks: categorizedTasks.threeDaysAfterTomorrow },
  ];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="row">
        <button
          className="btn btn-primary py-2 rounded w-30 small"
          onClick={handleShowAddTaskCard}
          style={{ textDecoration: 'none',  fontSize: "12px" }}
        >
          <FontAwesomeIcon icon={faPlus} className="pe-2 small" />
          הוסף משימה
        </button>

        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-secondary" onClick={goToPreviousWeek}>
            שבוע קודם
          </button>
          <button className="btn btn-secondary" onClick={goToNextWeek}>
            שבוע הבא
          </button>
        </div>

        {!loading && (
          <CreateTaskCalendar
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
            projectMembers={projectMembers} // Pass the fetched users to CreateTaskCalendar
            handleHideAddTaskCard={handleHideAddTaskCard}
            handleSaveTask={handleSaveTask}
          />
        )}
        {columns.map((column, index) => (
          renderColumn(column.id, column.label, column.tasks)
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </DragDropContext>
  );
}

export default BoardByDay;
