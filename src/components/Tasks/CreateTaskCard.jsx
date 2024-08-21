import React from "react";
import PropTypes from "prop-types";
import { TaskPropType } from "../../lib/propTypes";
import { faCalendar, faCircleCheck, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import UpdateAssigneeDropdown from "./UpdateAssigneeDropdown";

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
  assignee,
  setAssignee,
  status,
  setStatus,
  projectMembers,
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
          <div className="w-100">
            <label className="form-label" htmlFor="taskName">שם משימה</label>
            <input
              id="taskName"
              type="text"
              className="border-0 rounded w-100 py-2 medium"
              placeholder="הכנס שם משימה"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex align-items-center pb-3">
          <FontAwesomeIcon
            icon={faCalendar}
            className="text-muted medium pe-2"
          />
          <div className="w-100">
            <label className="form-label" htmlFor="dueDate">תאריך יעד</label>
            <input
              id="dueDate"
              type="date"
              className="border-0 rounded w-100 py-2 medium"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex align-items-center pb-3">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-muted medium pe-2"
          />
          <div className="w-100">
            <label className="form-label" htmlFor="email">אימייל</label>
            <input
              id="email"
              type="email"
              className="border-0 rounded w-100 py-2 medium"
              placeholder="הכנס אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex align-items-center pb-3">
          <FontAwesomeIcon
            icon={faPhone}
            className="text-muted medium pe-2"
          />
          <div className="w-100">
            <label className="form-label" htmlFor="phone">טלפון</label>
            <input
              id="phone"
              type="tel"
              className="border-0 rounded w-100 py-2 medium"
              placeholder="הכנס מספר טלפון"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex align-items-center pb-3">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-muted medium pe-2"
          />
          <div className="w-100">
            <label className="form-label" htmlFor="assigneeDropdown">שיוך משימה</label>
            <UpdateAssigneeDropdown
              projectMembers={projectMembers}
              selectedAssignee={assignee}
              setSelectedAssignee={setAssignee}
            />
          </div>
        </div>

        <div className="d-flex align-items-center mt-5">
          <label className="form-label pe-3" htmlFor="statusSelect">סטטוס</label>
          <Form className="m-0 w-50">
            <Form.Group controlId="statusSelect">
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="todo">תחילת עבודה</option>
                <option value="in_progress">בעבודה</option>
                <option value="on_hold">הקפאה</option>
                <option value="done">הסתיים</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </div>

        <div className="mt-3">
          <label className="form-label" htmlFor="description">פרטי המשימה</label>
          <textarea
            id="description"
            className="form-control bg-gray-light mb-2"
            placeholder="הכנס פרטי משימה"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
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
  assignee: PropTypes.object,
  setAssignee: PropTypes.func,
  status: PropTypes.string,
  setStatus: PropTypes.func,
  projectMembers: PropTypes.arrayOf(PropTypes.object),
  handleHideAddTaskCard: PropTypes.func,
  handleSaveTask: PropTypes.func,
};

export default CreateTaskCard;
