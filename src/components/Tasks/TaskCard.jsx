import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV ,faGripLines } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';
import { TaskPropType } from "../../lib/propTypes";

const TaskCard = ({ task, handleShowTaskModal, handleArchive , dragHandleProps  }) => {
  const { t } = useTranslation();

  // Function to generate Google Calendar URL
  const generateGoogleCalendarUrl = (task) => {
    const baseUrl = "https://calendar.google.com/calendar/render";
    const dueDate = task.due_date ? new Date(task.due_date) : null;
    const subject = task.subject ? encodeURIComponent(task.subject) : "";

    const details = encodeURIComponent(`Description: ${task.description}\nPhone: ${task.phone}\nEmail: ${task.email}`);
    
    if (dueDate) {
      const startDate = new Date(dueDate);
      startDate.setHours(9, 0, 0); // Start at 9:00 AM
      const endDate = new Date(dueDate);
      endDate.setHours(10, 0, 0); // End at 10:00 AM

      const startDateTime = startDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
      const endDateTime = endDate.toISOString().replace(/-|:|\.\d\d\d/g, "");

      return `${baseUrl}?action=TEMPLATE&text=${subject}&dates=${startDateTime}/${endDateTime}&details=${details}&location=&sf=true&output=xml`;
    }
    
    return `${baseUrl}?action=TEMPLATE&text=${subject}&details=${details}&sf=true&output=xml`;
  };
  let clickTimeout;
  // Handles opening the modal when clicking outside the dropdown
  const handleTaskClick = (e) => {
    clickTimeout = setTimeout(() => {
      if (!e.target.closest(".dropdown-toggle")) {
        handleShowTaskModal(task);
      }
    }, 200); // Delay in ms
  };
  const handleDragStart = () => {
    clearTimeout(clickTimeout);
  };
  return (
    <div className="task-card mb-2" style={{ padding: "6px", fontSize: "12px" }} onClick={handleTaskClick}>
      <div className="d-flex align-items-center justify-content-between">
        <button
          className="task-card-button btn btn-link"
          onClick={() => handleShowTaskModal(task)}
          style={{ textDecoration: 'none', color: 'inherit', padding: 0 }}
        >
        <span className="very-small">
          {task.subject && task.subject.length > 50 
            ? `${task.subject.substring(0, 50)}...` 
            : task.subject}
        </span>
        </button>
        <div className="drag-handle" {...dragHandleProps}>
          <FontAwesomeIcon icon={faGripLines} />
        </div>
        <div className="dropdown">
          <button
            className="btn btn-link dropdown-toggle"
            type="button"
            id={`dropdown-${task.id}`}
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={(e) => e.stopPropagation()} // Prevents modal from opening when clicking on the dropdown
            style={{ textDecoration: 'none', color: 'inherit', fontSize: "12px" }}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`dropdown-${task.id}`}>
            <li>
              <a
                className="dropdown-item"
                href={generateGoogleCalendarUrl(task)}
                target="_blank"
                rel="noopener noreferrer"
              >
                הוסף ליומן של גוגל
              </a>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={(e) => { e.stopPropagation(); handleArchive(task.id); }}
              >
                העבר לארכיון
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: TaskPropType.isRequired,
  handleShowTaskModal: PropTypes.func.isRequired,
  handleArchive: PropTypes.func.isRequired,
  dragHandleProps: PropTypes.object,
};

export default TaskCard;
