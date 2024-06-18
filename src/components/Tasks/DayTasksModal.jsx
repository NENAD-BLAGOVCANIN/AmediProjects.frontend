import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

function DayTasksModal({ showDayTasksModal, setShowDayTasksModal, tasksForDay, handleTaskClick }) {
    const { t } = useTranslation();

    return (
        <Modal show={showDayTasksModal} onHide={() => setShowDayTasksModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{t('tasks_for_selected_day')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {tasksForDay.length === 0 ? (
                    <p>{t('no_tasks_for_this_day')}</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>{t('task')}</th>
                                <th>{t('due_date')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasksForDay.map(task => (
                                <tr key={task.id} onClick={() => handleTaskClick(task)}>
                                    <td>{task.subject}</td>
                                    <td>{new Date(task.due_date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDayTasksModal(false)}>
                    {t('close')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DayTasksModal;
