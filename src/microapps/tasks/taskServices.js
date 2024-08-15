// src/microapps/tasks/taskServices.js
const API_BASE_URL = '/tasks';

console.log("JWT taskService :- ",localStorage.getItem('jwt'));
const fetchOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
  },
};

export const getAllTasks = async () => {
  const response = await fetch(API_BASE_URL, { ...fetchOptions, method: 'GET' });
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }
  return response.json();
};

export const getTaskById = async (taskId) => {
  const response = await fetch(`${API_BASE_URL}/${taskId}`, { ...fetchOptions, method: 'GET' });
  if (!response.ok) {
    throw new Error(`Failed to fetch task: ${response.statusText}`);
  }
  return response.json();
};

export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_BASE_URL}/${taskId}`, { ...fetchOptions, method: 'DELETE' });
  if (!response.ok) {
    throw new Error(`Failed to delete task: ${response.statusText}`);
  }
};

export const updateTask = async (task) => {
  const response = await fetch(`${API_BASE_URL}/${task.id}`, {
    ...fetchOptions,
    method: 'PUT',
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error(`Failed to update task: ${response.statusText}`);
  }
};

export const addTask = async (task) => {
  const response = await fetch(API_BASE_URL, {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error(`Failed to add task: ${response.statusText}`);
  }
  return response.json();
};

export const addNoteToTask = async (taskId, note) => {
  const response = await fetch(`${API_BASE_URL}/${taskId}/notes`, {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error(`Failed to add note: ${response.statusText}`);
  }
  return response.json();
};