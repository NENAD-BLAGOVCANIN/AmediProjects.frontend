import React from "react";
import PropTypes from "prop-types";
import { TaskPropType } from "../../lib/propTypes";
import { faCalendar, faCircleCheck, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from 'react-i18next';

const CreateTaskCard = ({
  showAddTaskCard,
  tasks,
  subject,
  setSubject,
  dueDate,
  setDueDate,
  description,
  setDescription,
  email,
  setEmail,
  phone,
  setPhone,
  handleHideAddTaskCard,
  handleSaveTask,
}) => {
  return (
    <div
      className={`task-card mb-3 ${
        showAddTaskCard || tasks.length === 0 ? "" : "d-none"
      }`}
    >
      <div>
        <div className="d-flex align-items-center pb-3">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-muted medium pe-2"
          />
          <input
            type="text"
            className="border-0 rounded w-100 py-2 medium"
            placeholder="הכנס שם משימה"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="d-flex align-items-center pb-3">
          <FontAwesomeIcon
            icon={faCalendar}
            className="text-muted medium pe-2"
          />
          <input
            type="date"
            className="border-0 rounded w-100 py-2 medium"
            placeholder="תאריך יעד"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="d-flex align-items-center pb-3">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-muted medium pe-2"
          />
          <input
            type="email"
            className="border-0 rounded w-100 py-2 medium"
            placeholder="אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="d-flex align-items-center pb-3">
          <FontAwesomeIcon
            icon={faPhone}
            className="text-muted medium pe-2"
          />
          <input
            type="tel"
            className="border-0 rounded w-100 py-2 medium"
            placeholder="פלאפון"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <textarea
          className="form-control bg-gray-light mb-2"
          placeholder="פרטי המשימה"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="d-flex justify-content-end w-100">
          <div className="pe-1">
            <button
              className="btn btn-basic border"
              onClick={handleHideAddTaskCard}
            >
              ביטול
            </button>
          </div>
          <div className="ps-1">
            <button
              className="btn btn-primary"
              onClick={() => handleSaveTask()}
            >
              שמירה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskCard;

CreateTaskCard.propTypes = {
  showAddTaskCard: PropTypes.bool,
  tasks: PropTypes.arrayOf(TaskPropType),
  subject: PropTypes.string,
  setSubject: PropTypes.func,
  dueDate: PropTypes.string,
  setDueDate: PropTypes.func,
  description: PropTypes.string,
  setDescription: PropTypes.func,
  email: PropTypes.string,
  setEmail: PropTypes.func,
  phone: PropTypes.string,
  setPhone: PropTypes.func,
  handleHideAddTaskCard: PropTypes.func,
  handleSaveTask: PropTypes.func,
};
