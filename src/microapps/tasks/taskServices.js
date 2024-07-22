// src/services/taskService.js
const API_BASE_URL = '/tasks';

const fetchOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

export const getAllTasks = async () => {
  const response = await fetch(API_BASE_URL, { ...fetchOptions, method: 'GET' });
  return response.json();
};

export const getTaskById = async (taskId) => {
  const response = await fetch(`${API_BASE_URL}/${taskId}`, { ...fetchOptions, method: 'GET' });
  return response.json();
};

export const deleteTask = async (taskId) => {
  await fetch(`${API_BASE_URL}/${taskId}`, { ...fetchOptions, method: 'DELETE' });
};

export const updateTask = async (task) => {
  await fetch(`${API_BASE_URL}/${task.id}`, {
    ...fetchOptions,
    method: 'PUT',
    body: JSON.stringify(task),
  });
};

export const addTask = async (task) => {
  const response = await fetch(API_BASE_URL, {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify(task),
  });
  return response.json();
};

export const addNoteToTask = async (taskId, note) => {
  const response = await fetch(`${API_BASE_URL}/${taskId}/notes`, {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify(note),
  });
  return response.json();
};