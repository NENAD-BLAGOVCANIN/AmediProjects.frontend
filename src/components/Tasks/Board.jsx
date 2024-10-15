// Board.jsx
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateTask, saveTask } from "../../api/tasks";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal"; // Ensure TaskModal is properly imported
import CreateTaskCard from "./CreateTaskCard"; // Import the CreateTaskCard component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Board({
  tasks,
  setTasks,
  setSelectedTask,
  selectedTask,
  showTasksModal,
  setShowTasksModal,
}) {
  const [showAddTaskCard, setShowAddTaskCard] = useState(false); // State to show/hide new task form
  const [subject, setSubject] = useState(""); // State for new task subject
  const [dueDate, setDueDate] = useState(""); // State for new task due date
  const [description, setDescription] = useState(""); // State for new task description
  const [email, setEmail] = useState(""); // State for new task email
  const [phone, setPhone] = useState(""); // State for new task phone
  const [assignee, setAssignee] = useState(null); // State for selected assignee
  const [projectMembers, setProjectMembers] = useState([]); // Fetch users for task assignment
  const [loading, setLoading] = useState(false); // Add this line to define loading state
  
  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceTasks = tasks.filter((task) => task.status === source.droppableId);
    const destTasks = tasks.filter((task) => task.status === destination.droppableId);

    const [movedTask] = sourceTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;

    destTasks.splice(destination.index, 0, movedTask);

    const updatedTasks = tasks
      .filter((task) => task.status !== source.droppableId && task.status !== destination.droppableId)
      .concat(sourceTasks, destTasks);

    setTasks(updatedTasks);

    try {
      await updateTask(movedTask);
      console.log(`Task ${movedTask.id} updated successfully.`);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleColumnClick = (status) => {
    const tasksInStatus = tasks.filter((task) => task.status === status);

    if (tasksInStatus.length > 0) {
      // If there are tasks, open the modal for the first task in the column
      setSelectedTask(tasksInStatus[0]);
      setShowTasksModal(true);
    }
  };

  const handleShowAddTaskCard = () => {
    setShowAddTaskCard(true);
  };

  const handleHideAddTaskCard = () => {
    setShowAddTaskCard(false);
  };

  const handleSaveTask = async () => {
    const savedTask = {
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

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row scrollable-container" >
          <div className="row">

          <button
            className="btn btn-primary py-2 rounded w-30 small"
            onClick={handleShowAddTaskCard}
            style={{ textDecoration: 'none',  fontSize: "12px" }}
          >
            <FontAwesomeIcon icon={faPlus} className="pe-2 small" />
            הוסף משימה
          </button>
          </div>

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
              projectMembers={projectMembers} // Pass the fetched users to CreateTaskCard
              handleHideAddTaskCard={handleHideAddTaskCard}
              handleSaveTask={handleSaveTask}
            />
          )}

          {["in_progress", "on_hold", "done"].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  className="col-3 p-3"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ borderRight: status !== "done" ? "1px solid #ddd" : "none", overflowY: "auto", height: "90vh" }}
                >
                  <div className="d-flex justify-content-between">
                    <p
                      className="mb-3 fw-500"
                      onClick={() => handleColumnClick(status)} // Open the modal when clicking on the header
                      style={{ cursor: "pointer" }}
                    >
                      {getStatusTitle(status)}
                      <span className="text-muted fw-400 medium px-2">
                        {tasks.filter((task) => task.status === status).length}
                      </span>
                    </p>
                  </div>

                  <div>
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                          {(provided , snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={snapshot.isDragging ? "dragging" : ""}
                            >
                              <TaskCard
                                task={task}
                                dragHandleProps={provided.dragHandleProps}
                                handleShowTaskModal={() => {
                                  setSelectedTask(task); // Set the selected task
                                  setShowTasksModal(true); // Show the modal when the task is clicked
                                  
                                }}
                                handleArchive={() => console.log(`Archiving task ${task.id}`)}
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
          ))}
        </div>
      </DragDropContext>

      {/* Render Task Modal */}
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
    </>
  );
}

function getStatusTitle(status) {
  switch (status) {
    case "in_progress": return "עבודה"; // Hebrew for "In Progress"
    case "on_hold": return "הקפאה"; // Hebrew for "On Hold"
    case "done": return "הסתיימו"; // Hebrew for "Done"
    default: return "";
  }
}

export default Board;
