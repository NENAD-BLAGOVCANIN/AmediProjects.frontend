import React, { useState, useEffect, useRef } from "react";
import { updateTask } from "../api/tasks";
import profileImagePlaceholder from "../assets/img/profile.svg";
import UpdateAssigneeDropdown from "./UpdateAssigneeDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faListCheck,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";

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
  const [editedTitle, setEditedTitle] = useState(selectedTask.subject);
  const [editedDescription, setEditedDescription] = useState(
    selectedTask.description
  );
  const [editedDueDate, setEditedDueDate] = useState(selectedTask.due_date);
  const [statusDropdownIsOpen, setStatusDropdownIsOpen] = useState(false);
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
    setSelectedStatus(selectedTask.status);
  }, [selectedTask]);

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
            <h5>Description</h5>
            <textarea
              className="form-control rounded w-100 py-2"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              onBlur={handleBlur}
            />
            <div className="d-flex align-items-center mt-5">
              <h5 className="mb-0 pe-3">Assignee</h5>
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
              <h5 className="mb-0 pe-3">Due date</h5>
              <input
                type="date"
                className="form-control rounded py-2 w-50"
                value={editedDueDate}
                onChange={(e) => setEditedDueDate(e.target.value)}
                onBlur={handleBlur}
              />
            </div>

            <div className="d-flex align-items-center mt-5">
              <h5 className="mb-0 pe-3">Status</h5>
              <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Select
                    custom
                    value={selectedStatus}
                    onChange={(e) => changeTaskStatus(e.target.value)}
                  >
                    <option value="todo">To do</option>
                    <option value="in_progress">Doing</option>
                    <option value="on_hold">On hold</option>
                    <option value="done">Done</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
