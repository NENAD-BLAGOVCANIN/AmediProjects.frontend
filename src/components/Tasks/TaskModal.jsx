import React, { useState, useEffect, useRef } from "react";
import { updateTask, saveTask, getTaskableItems } from "../../api/tasks";
import profileImagePlaceholder from "../../assets/img/profile.svg";
import UpdateAssigneeDropdown from "./UpdateAssigneeDropdown";
import { Form } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

function TaskModal({
  showTasksModal,
  setShowTasksModal,
  selectedTask,
  setSelectedTask,
  tasks,
  setTasks,
  projectMembers,
  setProjectMembers,
}) {
  const { t } = useTranslation();

  const [editedTitle, setEditedTitle] = useState(selectedTask.subject);
  const [editedDescription, setEditedDescription] = useState(selectedTask.description);
  const [editedDueDate, setEditedDueDate] = useState(selectedTask.due_date);
  const [editedPhone, setEditedPhone] = useState(selectedTask.phone);
  const [editedEmail, setEditedEmail] = useState(selectedTask.email);
  const [selectedTaskableType, setSelectedTaskableType] = useState(selectedTask.taskable_type || '');
  const [selectedTaskableId, setSelectedTaskableId] = useState(selectedTask.taskable_id || '');
  const [taskableItems, setTaskableItems] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(selectedTask.status);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleCloseTaskModal = () => {
    setShowTasksModal(false);
  };

  useEffect(() => {
    setEditedDueDate(selectedTask.due_date);
    setEditedDescription(selectedTask.description);
    setEditedTitle(selectedTask.subject);
    setEditedPhone(selectedTask.phone);
    setEditedEmail(selectedTask.email);
    setSelectedStatus(selectedTask.status);
    setSelectedTaskableType(selectedTask.taskable_type || '');
    setSelectedTaskableId(selectedTask.taskable_id || '');
  }, [selectedTask]);

  useEffect(() => {
    if (selectedTaskableType) {
      fetchTaskableItems(selectedTaskableType);
    }
  }, [selectedTaskableType]);

  const fetchTaskableItems = async (taskableType) => {
    try {
      const items = await getTaskableItems(taskableType);
      setTaskableItems(items);
    } catch (error) {
      console.error("Failed to fetch taskable items:", error);
    }
  };

  const handleTitleChange = () => {
    const caretPosition = window.getSelection().getRangeAt(0).startOffset;
    setEditedTitle(titleRef.current.innerText);
    setTimeout(() => {
      setCaretPosition(titleRef.current, caretPosition);
    }, 0);
  };

  const handleDescriptionChange = () => {
    setEditedDescription(descriptionRef.current.innerText);
  };

  const setCaretPosition = (element, position) => {
    const range = document.createRange();
    const selection = window.getSelection();

    if (element.childNodes.length > 0) {
      range.setStart(
        element.childNodes[0],
        Math.min(position, element.textContent.length)
      );
    } else {
      range.setStart(element, Math.min(position, element.textContent.length));
    }

    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleBlur = async () => {
    if (editedTitle.trim() === "") {
      return;
    }

    const updatedTask = {
      ...selectedTask,
      subject: editedTitle,
      description: editedDescription,
      due_date: editedDueDate,
      phone: editedPhone,
      email: editedEmail,
      taskable_type: selectedTaskableType,
      taskable_id: selectedTaskableId,
    };

    await updateTask(updatedTask);

    setSelectedTask(updatedTask);

    const updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const changeTaskStatus = async (status) => {
    setSelectedStatus(status);
    const taskIndex = tasks.findIndex((task) => task.id === selectedTask.id);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        status: status,
      };
      setTasks(updatedTasks);
    }

    const updatedTask = {
      ...selectedTask,
      status: status,
    };

    const response = await updateTask(updatedTask);

    if (response.ok) {
      setSelectedTask(updatedTask);
    }
  };

  const taskableTypes = [
    { value: 'App\\Models\\Contact', label: 'Contact' },
    { value: 'App\\Models\\Collection', label: 'Collection' },
    { value: 'App\\Models\\Lead', label: 'Lead' },
  ];

  return (
    <div
      className={`modal fade ${showTasksModal ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={{ maxWidth: 800, padding: "1.7rem" }}
      >
        <div
          className="modal-content py-3 px-4 border-0 shadow-lg"
          style={{ maxHeight: 900, overflow: "auto" }}
        >
          <div className="modal-header pb-0 border-0 d-flex align-items-center">
            <div>
              <h4 className="modal-title bold m-0" onBlur={handleBlur}>
                <span
                  ref={titleRef}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={handleBlur}
                  onInput={handleTitleChange}
                  dir="ltr"
                >
                  {editedTitle}
                </span>
              </h4>
              <span className="small text-muted">
                In list <u>{selectedTask.status}</u>
              </span>
            </div>
            <span
              type="button"
              className="close ms-auto m-0 text-secondary"
              onClick={handleCloseTaskModal}
              style={{ fontSize: "25pt", fontWeight: "300" }}
            >
              <span aria-hidden="true">&times;</span>
            </span>
          </div>
          <div className="modal-body py-5">
            <h5>פירוט משימה</h5>
            <textarea
              className="form-control rounded w-100 py-2"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              onBlur={handleBlur}
            />
            <div className="d-flex align-items-center mt-5">
              <h5 className="mb-0 pe-3">שיוך משימה</h5>
              <UpdateAssigneeDropdown
                projectMembers={projectMembers}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                tasks={tasks}
                setTasks={setTasks}
              />
            </div>

            {selectedTask.assignee && (
              <div className="d-flex align-items-center pt-3">
                <img
                  src={selectedTask?.assignee?.profile_image ?? profileImagePlaceholder}
                  className="rounded-circle"
                  alt=""
                  style={{ width: 35, height: 35, objectFit: 'cover' }}
                />
                <span className="px-2 medium">
                  {selectedTask.assignee.name}
                </span>
              </div>
            )}

            <div className="d-flex align-items-center mt-5">
              <h5 className="mb-0 pe-3">תאריך יעד</h5>
              <input
                type="date"
                className="form-control rounded py-2 w-50"
                value={editedDueDate}
                onChange={(e) => setEditedDueDate(e.target.value)}
                onBlur={handleBlur}
              />
            </div>

            <div className="d-flex align-items-center mt-5">
              <h5 className="mb-0 pe-3">טלפון</h5>
              <input
                type="tel"
                className="form-control rounded py-2 w-50"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
                onBlur={handleBlur}
              />
            </div>

            <div className="d-flex align-items-center mt-5">
              <h5 className="mb-0 pe-3">דוא"ל</h5>
              <input
                type="email"
                className="form-control rounded py-2 w-50"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                onBlur={handleBlur}
              />
            </div>

            {/* <div className="d-flex align-items-center mt-5">
              <h5 className="mb-0 pe-3">סוג שיוך משימה</h5>
              <Form className="m-0 w-50">
                <Form.Group controlId="taskableTypeSelect">
                  <Form.Select
                    value={selectedTaskableType}
                    onChange={(e) => setSelectedTaskableType(e.target.value)}
                  >
                    <option value="">Select Taskable Type</option>
                    {taskableTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>

            <div className="d-flex align-items-center mt-5">
              <h5 className="mb-0 pe-3">ID שיוך משימה</h5>
              <Form className="m-0 w-50">
                <Form.Group controlId="taskableIdSelect">
                  <Form.Select
                    value={selectedTaskableId}
                    onChange={(e) => setSelectedTaskableId(e.target.value)}
                  >
                    <option value="">Select Taskable Item</option>
                    {taskableItems.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
            </div> */}

            <div className="d-flex align-items-center mt-5">
              <h5 className="mb-0 pe-3">סטטוס</h5>
              <Form className="m-0">
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Select
                    custom
                    value={selectedStatus}
                    onChange={(e) => changeTaskStatus(e.target.value)}
                  >
                    <option value="todo">צריך לעשות</option>
                    <option value="in_progress">בעבודה</option>
                    <option value="on_hold">הקפאה</option>
                    <option value="done">הסתיים</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>
            <div className="pt-3">
              <button className="btn btn-primary" onClick={handleCloseTaskModal}>שמירה</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
