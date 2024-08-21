import React, { useState, useEffect } from 'react';
import { getTasksWithUsers } from '../../api/tasks'; // Adjust the path as necessary
import UserTasksModal from './UserTasksModal';

function UserTasksTable() {
  const [usersTasks, setUsersTasks] = useState([]);
  const [filteredUsersTasks, setFilteredUsersTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Set default items per page to 5

  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUsersTasks = async () => {
    try {
      const fetchedTasks = await getTasksWithUsers();

      // Filter out deleted tasks
      const nonDeletedTasks = fetchedTasks.filter(task => !task.is_deleted);

      // Group tasks by assignee
      const tasksByUser = nonDeletedTasks.reduce((acc, task) => {
        const assignee = task.assignee ? task.assignee.name : 'משימות ללא שיוך';
        if (!acc[assignee]) {
          acc[assignee] = { 
            name: assignee, 
            tasks: [] 
          };
        }
        acc[assignee].tasks.push(task);
        return acc;
      }, {});

      const tasksArray = Object.values(tasksByUser);
      setUsersTasks(tasksArray);
      setFilteredUsersTasks(tasksArray);
    } catch (error) {
      console.error('Error fetching tasks with users:', error);
    }
  };

  useEffect(() => {
    fetchUsersTasks();
  }, []);

  useEffect(() => {
    const results = usersTasks.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.tasks.some(task => task.subject && task.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredUsersTasks(results);
  }, [searchTerm, usersTasks]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowClick = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsersTasks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsersTasks.length / itemsPerPage);

  return (
    <>
      <div>
        <input 
          type="text" 
          placeholder="חיפוש" 
          value={searchTerm} 
          onChange={handleSearch} 
          className="form-control my-3" 
        />
      </div>
      <div className="bg-white rounded p-3 shadow-sm" style={{ overflowX: 'auto' }}>
        <h6 className="bold mb-3">טבלת משימות לפי משתמש</h6>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>שם משתמש</th>
              <th>מספר משימות</th>
              <th>משימות בעשייה</th>
              <th>משימות לביצוע</th>
              <th>משימות סיימות</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user, index) => {
              const tasks = user.tasks || [];
              const doingTasks = tasks.filter(task => task.status === 'in_progress').length;
              const todoTasks = tasks.filter(task => task.status === 'todo').length;
              const finishedTasks = tasks.filter(task => task.status === 'done').length;

              return (
                <tr key={index} onClick={() => handleRowClick(user)}>
                  <td>{user.name}</td>
                  <td>{tasks.length}</td>
                  <td>{doingTasks}</td>
                  <td>{todoTasks}</td>
                  <td>{finishedTasks}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="d-flex flex-column justify-content-between mb-3">
          <div className="col-md-3 ml-1">
            <label>כמות משתמשים להציג</label>
            <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="form-select">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
          </div>
          <label className="mr-2 mt-2">מעבר בין עמודים</label>
          <div className="d-flex flex-row col-md-8 mt-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-light'}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div></div>
        </div>
      </div>
      {showModal && (
        <UserTasksModal 
          show={showModal} 
          onHide={() => setShowModal(false)} 
          user={currentUser} 
        />
      )}
    </>
  );
}

export default UserTasksTable;
