import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import profileImagePlaceholder from "../../assets/img/profile.svg";
import { TaskPropType } from "../../lib/propTypes";

const TaskCard = ({ task, handleShowTaskModal }) => {
  return (
    <button
      className="task-card mb-3"
      onClick={() => handleShowTaskModal(task)}
    >
      <div className="px-1 d-flex align-items-start">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="text-muted medium pe-2"
        />
        <span className="pe-2 medium">{task.subject}</span>
      </div>
      <div className="pt-3 d-flex align-items-center">
        <div className="pe-3">
          <img
            src={task?.assignee?.profile_image ?? profileImagePlaceholder}
            className="rounded-circle w-100"
            alt=""
            style={{ height: 25, maxWidth: 25, objectFit: 'cover' }}
          />
        </div>
        <span className="small text-muted">
          {task?.due_date
            ? new Date(task.due_date).toDateString()
            : "No due date"}
        </span>
      </div>
    </button>
  );
};

TaskCard.propTypes = {
  task: TaskPropType,
  handleShowTaskModal: PropTypes.func.isRequired,
};

export default TaskCard;
