import React, { useState } from 'react';
import { Trash, Edit, Check } from 'lucide-react';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, task: 'Buy milk', isCompleted: false, isUrgent: false },
    { id: 2, task: 'Walk the dog', isCompleted: false, isUrgent: true },
    { id: 3, task: 'Do laundry', isCompleted: false, isUrgent: false },
  ]);
  const [newTask, setNewTask] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      setTodos([...todos, { id: todos.length + 1, task: newTask, isCompleted: false, isUrgent }]);
      setNewTask('');
      setIsUrgent(false);
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (todo) => {
    setEditing(todo);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editing) {
      setTodos(
        todos.map((todo) => (todo.id === editing.id ? { ...todo, task: newTask, isUrgent } : todo))
      );
      setEditing(null);
      setNewTask('');
      setIsUrgent(false);
    }
  };

  const handleToggleCompleted = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo))
    );
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          className="p-2 rounded border border-gray-400 focus:outline-none focus:ring focus:border-blue-500"
        />
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={isUrgent}
            onChange={() => setIsUrgent(!isUrgent)}
            className="mr-2"
          />
          <span>Urgent</span>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </form>
      {editing && (
        <form onSubmit={handleUpdate} className="flex flex-col mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Update task"
            className="p-2 rounded border border-gray-400 focus:outline-none focus:ring focus:border-blue-500"
          />
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={isUrgent}
              onChange={() => setIsUrgent(!isUrgent)}
              className="mr-2"
            />
            <span>Urgent</span>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Task
          </button>
        </form>
      )}
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between p-2 border-b border-gray-400 ${
              todo.isCompleted ? 'bg-green-100' : todo.isUrgent ? 'bg-red-100' : ''
            }`}
          >
            <span
              className={`text-lg ${todo.isCompleted ? 'line-through' : ''} ${
                todo.isUrgent ? 'text-red-500' : ''
              }`}
            >
              {todo.task}
            </span>
            <div className="flex items-center">
              <button
                onClick={() => handleToggleCompleted(todo.id)}
                className="mr-2 text-lg"
              >
                <Check color={todo.isCompleted ? 'green' : 'gray'} />
              </button>
              <button onClick={() => handleEdit(todo)} className="mr-2 text-lg">
                <Edit />
              </button>
              <button onClick={() => handleDelete(todo.id)} className="text-lg">
                <Trash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;