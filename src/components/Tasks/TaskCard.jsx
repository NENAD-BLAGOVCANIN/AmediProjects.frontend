import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { TaskPropType } from "../../lib/propTypes";
import { useTranslation } from 'react-i18next';

const TaskCard = ({ task, handleShowTaskModal, handleArchive }) => {
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

  return (
    <div className="task-card mb-2">
      <button
        className="task-card-button"
        onClick={() => handleShowTaskModal(task)}
      >
        <div className="px-1 d-flex align-items-start justify-content-between">
          <div>
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-muted medium pe-2"
            />
            <span className="pe-2 medium">{task.subject}</span>
          </div>
          
        </div>
        <div className="pt-3">
          <span className="small text-muted">
            {task?.due_date
              ? new Date(task.due_date).toDateString()
              : "No due date"}
          </span>
        </div>
      </button>
        <div className="d-flex justify-content-evenly  align-self-start">
      <a
        href={generateGoogleCalendarUrl(task)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary m-2 bi bi-google "
      >
      
        הוספה לגוגל
      </a>
      
            <button
              className="btn btn-sm btn-danger m-2  "
              onClick={(e) => { e.stopPropagation(); handleArchive(task.id); }}
            >
              לארכיון
            </button>
          </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: TaskPropType,
  handleShowTaskModal: PropTypes.func.isRequired,
  handleArchive: PropTypes.func.isRequired, // Added handleArchive prop type
};

export default TaskCard;
