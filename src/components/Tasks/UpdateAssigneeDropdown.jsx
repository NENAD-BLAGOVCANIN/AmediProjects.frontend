import React from 'react';

function UpdateAssigneeDropdown({ projectMembers, selectedTask, setSelectedTask, tasks, setTasks }) {
  const handleAssigneeChange = (e) => {
    const newAssigneeId = e.target.value;
    const newAssignee = projectMembers.find(member => member.id === parseInt(newAssigneeId));
    
    const updatedTask = { 
      ...selectedTask, 
      assignee: newAssignee || null // Ensure assignee is set to null if not found
    };

    setSelectedTask(updatedTask);
    
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    
    setTasks(updatedTasks);
  };

  if (!projectMembers || projectMembers.length === 0) {
    return <div>No project members available</div>;
  }

  const filteredMembers = projectMembers.filter(member => ![1, 2, 3].includes(member.id));

  return (
    <select 
      onChange={handleAssigneeChange} 
      value={selectedTask?.assignee?.id || ''} // Safely access nested properties
      className="form-select"
    >
      <option value=''>Select Assignee</option>
      {filteredMembers.map(member => (
        <option key={member.id} value={member.id}>
          {member.name}
        </option>
      ))}
    </select>
  );
}

export default UpdateAssigneeDropdown;
