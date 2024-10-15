import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const statusTranslation = {
  'in_progress': 'עבודה',
  'todo': 'לביצוע',
  'done': 'הושלם',
  // Add other status translations here as needed
};

function UserTasksModal({ show, onHide, user }) {
  if (!user) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>משימות של {user.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>נושא משימה</th>
              <th>תיאור</th>
              <th>סטטוס</th>
              <th>תאריך יעד</th>
            </tr>
          </thead>
          <tbody>
            {user.tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.subject}</td>
                <td>{task.description}</td>
                <td>{statusTranslation[task.status] || task.status}</td>
                <td>{task.due_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          סגור
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserTasksModal;
