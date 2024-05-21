import React, { useState, useEffect } from "react";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import {
  faCalendar,
  faEllipsis,
  faListCheck,
  faPlus,
  faTable,
  faTimeline,
} from "@fortawesome/free-solid-svg-icons";
import profileImagePlaceholder from "../../assets/img/profile.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveTask } from "../../api/tasks";
import TaskCard from "./TaskCard";
import CreateTaskCard from "./CreateTaskCard";
import { useTranslation } from 'react-i18next';

function Board({
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
    } catch {}
  };

  return (
    <div className="row">
      <div className="col-3 p-3">
        <div className="d-flex justify-content-between">
          <p className="mb-3 fw-500">
            To do
            <span className="text-muted fw-400 medium px-2">{tasks.filter((task) => task.status === "todo").length}</span>
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

        <div
          className={`bg-${
            tasks.filter((task) => task.status === "todo").length === 0 &&
            tasks.length > 0
              ? "gray py-5"
              : ""
          } w-100 rounded`}
        >
          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                handleShowTaskModal={handleShowTaskModal}
              />
            ))}
        </div>

        <CreateTaskCard
          showAddTaskCard={showAddTaskCard}
          tasks={tasks}
          subject={subject}
          setSubject={setSubject}
          dueDate={dueDate}
          setDueDate={setDueDate}
          description={description}
          setDescription={setDescription}
          handleHideAddTaskCard={handleHideAddTaskCard}
          handleSaveTask={handleSaveTask}
        />

        <button
          className="btn py-2 rounded color-text-lighter w-100 medium"
          onClick={handleShowAddTaskCard}
        >
          <FontAwesomeIcon icon={faPlus} className="pe-2 medium" />
          Add Task
        </button>
      </div>
      <div className="col-3 p-3">
        <div className="d-flex justify-content-between">
          <p className="mb-3 fw-500">
            Doing
            <span className="text-muted fw-400 medium px-2">{tasks.filter((task) => task.status === "in_progress").length}</span>
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
        <div
          className={`bg-${
            tasks.filter((task) => task.status === "in_progress").length === 0
              ? "gray py-5"
              : ""
          } w-100 rounded`}
        >
          {tasks
            .filter((task) => task.status === "in_progress")
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                handleShowTaskModal={handleShowTaskModal}
              />
            ))}
        </div>
      </div>
      <div className="col-3 p-3">
        <div className="d-flex justify-content-between">
          <p className="mb-3 fw-500">
            On Hold
            <span className="text-muted fw-400 medium px-2">{tasks.filter((task) => task.status === "on_hold").length}</span>
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
        <div
          className={`bg-${
            tasks.filter((task) => task.status === "on_hold").length === 0
              ? "gray py-5"
              : ""
          } w-100 rounded`}
        >
          {tasks
            .filter((task) => task.status === "on_hold")
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                handleShowTaskModal={handleShowTaskModal}
              />
            ))}
        </div>
      </div>
      <div className="col-3 p-3">
        <div className="d-flex justify-content-between">
          <p className="mb-3 fw-500">
            Done
            <span className="text-muted fw-400 medium px-2">{tasks.filter((task) => task.status === "done").length}</span>
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
        <div
          className={`bg-${
            tasks.filter((task) => task.status === "done").length === 0
              ? "gray py-5"
              : ""
          } w-100 rounded`}
        >
          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                handleShowTaskModal={handleShowTaskModal}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Board;
