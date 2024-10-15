import { apiUrl } from './config';

const getTasks = async () => {
  try {
    const token = localStorage.getItem('accessToken'); 

    const response = await fetch(apiUrl + '/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const saveTask = async (task) => {
  const data = task;

  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return error;
  }
};

const assignTo = async (user_id, task_id) => {
  const data = {
    "user_id": user_id,
    "task_id": task_id
  };

  try {
    const token = localStorage.getItem('accessToken'); 

    const response = await fetch(apiUrl + '/tasks/assign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return error;
  }
};

const updateTask = async (updatedTask) => {
  try {
    const token = localStorage.getItem('accessToken');
    const data = updatedTask;


    const response = await fetch(apiUrl + '/tasks/' + String(updatedTask.id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return error;
  }
};

const deleteTask = async (contact_id) => {
  try {
    const token = localStorage.getItem('accessToken'); 

    const response = await fetch(apiUrl + '/contacts/' + contact_id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return error;
  }
};

const updateArchiveStatus = async (taskId, data) => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await fetch(`${apiUrl}/tasks/${taskId}/archive`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getTaskableItems = async (taskableType) => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await fetch(`${apiUrl}/taskable-items?taskable_type=${taskableType}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getTasksWithUsers = async () => {
  try {
    const token = localStorage.getItem('accessToken'); 

    const response = await fetch(apiUrl + '/tasks-with-users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export {
  getTasks,
  saveTask,
  updateTask,
  assignTo,
  deleteTask,
  getTaskableItems,
  getTasksWithUsers,
  updateArchiveStatus
};
